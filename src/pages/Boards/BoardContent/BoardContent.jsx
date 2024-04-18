import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utilities/sorts'
import { 
  DndContext,
  // PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'

// import phần tử giữ chỗ cho DragOverlay
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}


function BoardContent({ board }) {
  // https://docs.dndkit.com/api-documentation/sensors
  // PointerSensor là mặc định thì phải có thuộc tính CSS touch-action: 'none': ở phần tử được kéo thả nhưng gặp bug
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  // Require the mouse to move by 10 pixels before activating, fix click call event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // Nhấn giữ 250ms và tolerance(dung sai) của cảm ứng (di chuyển lệch) 5px thì kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })

  // const Sensor = useSensors(pointerSensor)
  const Sensor = useSensors(mouseSensor, touchSensor)

  const [orderedColumnState, setorderedColumnState] = useState([])

  // Tại cùng 1 thời điểm chỉ có 1 id được kéo
  const [activeDragItemId, setActiveDragItemId] = useState([null])
  const [activeDragItemType, setActiveDragItemType] = useState([null])
  const [activeDragItemData, setActiveDragItemData] = useState([null])

  useEffect(() => {
    setorderedColumnState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Tìm 1 cái Column dựa trên CardId đã có
  const findColumnByCardId = (cardId) => {
    // ** Sử dụng column.cards thay vì column.cardOrderIds vì ở bước handleDragOver chúng ta sẽ
    // làm dữ liệu cho cards hoàn chỉnh trước rồi mới sắp xếp lại dữ liệu để tạo ra cardOrderIds mới
    // ** Đi vào mảng Column -> tìm column chứa 1 mảng card -> map mảng vừa tìm thấy, để thành một mảng mới
    // , mảng này sẽ chứa toàn bộ các _id của card, sau đó kiểm tra xem mảng đó có chứa cardId được truyền vào không
    return orderedColumnState.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // Khi bắt đầu kéo 1 phần tử là column hoặc card
  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setActiveDragItemId(event?.active?.id)
    // Nếu tồn tại columnId thì set kiểu cho ACTIVE_DRAG_ITEM_TYPE là CardId và ngược lại là ColumnId
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data.current)
  }

  // Đang trong quá trình kéo phần tử là column hoặc card
  const handleDragOver = (event) => {
    // Không làm gì thêm nếu đang kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    
    // Nếu không xảy ra if ở trên thì xử lý hành động kéo card qua lại giữa các column
    // console.log('handleDragOver: ', event)

    const { active, over } = event

    // Nếu ko tồn tại active or over thì return để tránh lỗi
    if (!active || !over) return

    // activeDraggingCard là card đang được kéo
    const { id: activeDraggingCardId, data: {current: activeDraggingCardData } } = active
    // overCard là card đang được tương tác trên hoặc dưới so với card đang được kéo (activeDraggingCard)
    const { id: overCardId } = over

    // Tìm 2 cái column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    // console.log('activeColumn: ',activeColumn)
    // console.log('overColumn: ',overColumn)

    // Tránh lỗi không tồn tại 1 trong 2 column
    if (!activeColumn || !overColumn) return

    // Khi kéo card qua 2 column khác nhau thì mới xử lý logic, còn nếu kéo card trong
    // column của nó thì không xử lý.
    // Đây là xử lý lúc đang kéo (over), không liên quan đến việc sát nhập dữ liệu ở (handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      setorderedColumnState(prevColumns => {
        // Tìm vị trí (index) của overCard trong column đích (nơi mà Card sắp được thả)
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        // Logic tính toán cardIndex mới (xác định vị trí trên dưới của overCard) nhưng ko hiểu sao translated = null mà code vẫn chạy :))
        let newCardIndex 
        const isBelowOverItem = active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        // console.log('isBelowOverItem: ', isBelowOverItem)
        // console.log('modifier: ', modifier)
        // console.log('overCardIndex: ', overCardIndex)

        // Đoạn này cài gói loDash, mục đích là clone mảng orderedColumnState cũ ra một cái mới 
        // để xử lý data rồi return, cập nhật lại orderedColumnState mới
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        // Cái column cũ bị kéo
        if (nextActiveColumn) {
          // Xoá card ở column cũ (column active) 
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
          // Cập nhật lại mảng cardOrderIds trong dữ liệu
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        // Cái column mới được kéo tới
        if (nextOverColumn) {
          // Kiểm tra card đang kéo có tồn tại ở overColumn chưa, nếu có thì cần xoá nó trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          // Thêm card đang kéo vào overColumn theo vị trí index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          // Cập nhật lại mảng cardOrderIds trong dữ liệu
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }
        return [...nextColumns]
      })
    }
  }
  
  // Khi bắt đầu thả 1 phần tử là column hoặc card
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    // Sử dụng cú pháp destructuring để lấy hai thuộc tính active và over từ đối tượng event
    const { active, over } = event

    // Nếu ko tồn tại active or over thì return để tránh lỗi
    if (!active || !over) return

    // Nếu kéo card thì chạy
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingCard là card đang được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // overCard là card đang được tương tác trên hoặc dưới so với card đang được kéo (activeDraggingCard)
      const { id: overCardId } = over

      // Tìm 2 cái column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      // console.log('activeColumn: ',activeColumn)
      // console.log('overColumn: ',overColumn)

      // Tránh lỗi không tồn tại 1 trong 2 column
      if (!activeColumn || !overColumn) return
    }

    // Nếu kéo column thì chạy
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      console.log('Đang kéo column')
      if (active.id !== over.id) {
        // Lấy vị trí cũ của active
        const oldIndex = orderedColumnState.findIndex(c => c._id == active.id)
        // Lấy vị trí mới của over
        const newIndex = orderedColumnState.findIndex(c => c._id == over.id)
  
        // Dùng arrayMove của dnd-Kit để sắp xếp lại mảng Col ban đầu
        // Code của arrayMove git của dnd-Kit: dnd-Kit/packages/sortable/src/utilities/arrayMove.ts
        const dndOrderedColumnState = arrayMove(orderedColumnState, oldIndex, newIndex)
        // Dữ liệu dùng để gọi API
        // const dndOrderedColumnIds = dndOrderedColumnState.map(c => c._id)
        // console.log('dndorderedColumnState', dndOrderedColumnState)
        // console.log('dndOrderedColumnIds', dndOrderedColumnIds)
  
        // Cập nhật lại state sau khi hành động
        setorderedColumnState(dndOrderedColumnState)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  // console.log('activeDragItemId', activeDragItemId)
  // console.log('activeDragItemType', activeDragItemType)
  // console.log('activeDragItemData', activeDragItemData)

  const styleDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } } })
  }
  
  return (
    <DndContext 
      sensors={Sensor}
      // Sử dụng thuật toán phát hiện va chạm
      // Có trong doc https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'light' ? '#BABCA7' : '#4C4A45'),
        width: '100%',
        height: (theme) => theme.casani.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumnState}/>
        <DragOverlay dropAnimation={styleDropAnimation}>

          {
            // Nếu giá trị activeDragItemType ban đầu là null thì không làm gì
            (!activeDragItemType) && null
          }

          {
            // Nếu activeDragItemType là column thì sẽ render 1 column để giữ chỗ
            // và truyền dữ liệu cho Column
            (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}
          />}
          {
            (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />
          }
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent