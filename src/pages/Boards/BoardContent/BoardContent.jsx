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
  defaultDropAnimationSideEffects 
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

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

  // Khi bắt đầu kéo 1 phần tử là column hoặc card
  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setActiveDragItemId(event?.active?.id)
    // Nếu tồn tại columnId thì set kiểu cho ACTIVE_DRAG_ITEM_TYPE là CardId và ngược lại là ColumnId
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data.current)
  }
  
  // Khi bắt đầu thả 1 phần tử là column hoặc card
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    // Sử dụng cú pháp destructuring để lấy hai thuộc tính active và over từ đối tượng event
    const { active, over } = event

    if (!over) return
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
  };
  
  return (
    <DndContext 
      sensors={Sensor}
      onDragStart={handleDragStart}
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