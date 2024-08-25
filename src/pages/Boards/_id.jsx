import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { cloneDeep } from 'lodash'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  moveCardtoDifferentColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import CustomLoading from '~/assets/CustomLoading' // Import CustomLoading
import {
  fetchBoardDetailsAPI,
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

function Board() {
  // Không dùng State của component nữa mà dùng State của Redux
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)

  const dispatch = useDispatch()

  useEffect(() => {
    // Tạm thời fix cứng Board ID, react-router-dom sẽ giúp chúng ta lấy ID từ URL
    const boardId = '6651788b2d70decdd157bdd9'
    // Gọi API trong Redux
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch])

  // Hàm gọi API để cập nhật mảng columnOrderIds của Board và làm mới dữ liệu State Board
  const moveColumns = (dndOrderedColumnState) => {
    // Cập nhật dữ liệu State Board
    const dndOrderedColumnIds = dndOrderedColumnState.map(c => c._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumnState
    newBoard.columnOrderIds = dndOrderedColumnIds
    dispatch(updateCurrentActiveBoard(newBoard))

    // Gọi API để cập nhật dữ liệu Column
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnIds
    })
  }

  // Khi di chuyển card trong cùng một column
  // Hàm gọi API để cập nhật mảng cardOrderIds của Column và làm mới dữ liệu State Board
  const moveCards = (dndOrderedCards, dndOrderedCardsIds, columnId) => {
    // Cập nhật dữ liệu State Board
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardsIds
    }
    dispatch(updateCurrentActiveBoard(newBoard))

    // Gọi API để cập nhật dữ liệu Column
    updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderedCardsIds
    })
  }

  // Khi di chuyển card sang một column khác
  /**
   * B1: Cập nhật mảng cardOrderIds của column nguồn
   * B2: Cập nhật mảng cardOrderIds của column đích
   * B3: Cập nhật lại trường columnId của card
   */
  const moveCardtoDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumnState) => {
    // Cập nhật dữ liệu State Board
    const dndOrderedColumnIds = dndOrderedColumnState.map(c => c._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumnState
    newBoard.columnOrderIds = dndOrderedColumnIds
    dispatch(updateCurrentActiveBoard(newBoard))

    // Gọi API để cập nhật dữ liệu Column
    let prevCardOrderIds = dndOrderedColumnState.find(column => column._id === prevColumnId).cardOrderIds
    // Kiểm tra xem column nguồn có phải là column rỗng không, column rỗng sẽ có placeholder-card cần xoá nó đi
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
    moveCardtoDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumnState.find(column => column._id === nextColumnId).cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box

        sx = {{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '100vh',
          width: '100vw',
          gap: 2,
          backgroundColor: '#e8e8e8'
        }}>
        <CustomLoading />
        <Typography variant='h6' sx ={{ userSelect: 'none' }}>Loading Board ...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth='false' sx={{ height: '100vh' }}>
      <AppBar />
      {/* Optionnal chaining */}
      <BoardBar board={board}/>
      <BoardContent
        board={board}

        // 3 cái trường hợp move dưới đây thì giữ nguyên để xử lý kéo thả ở phần BoardContent không bị quá dài mất kiểm soát khi đọc code, maintain code
        moveColumns={moveColumns}
        moveCards={moveCards}
        moveCardtoDifferentColumn={moveCardtoDifferentColumn}
      />
    </Container>
  )
}

export default Board
