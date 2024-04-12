import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utilities/sorts'
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

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
  useEffect(() => {
    setorderedColumnState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event)
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
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={Sensor}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'light' ? '#BABCA7' : '#4C4A45'),
        width: '100%',
        height: (theme) => theme.casani.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumnState}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent