import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import CustomLoading from '~/assets/CustomLoading' // Import CustomLoading
import {
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardtoDifferentColumnAPI,
  deleteColumnDetailsAPI
} from '~/apis'
import { genaratePlaceholderCard } from '~/utilities/formatters'
import { Typography } from '@mui/material'
import { toast } from 'react-toastify'
import {
  fetchBoardDetailsAPI,
  selectCurrentActiveBoard,
  updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'

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

  // Hàm gọi API để tạo mới Column và làm mới dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Khi tạo mới Column, cần thêm một card placeholder vào column đó
    createdColumn.cards = [genaratePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [genaratePlaceholderCard(createdColumn)._id]

    /**
     * Câp nhật dữ liệu State Board
     * FE tự quản lý dữ liệu state data, không cần gọi lại API fetchBoardDetailsAPI để lấy dữ liệu mới
     */
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))
  }

  // Hàm gọi API để tạo mới Card và làm mới dữ liệu State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // Cập nhật dữ liệu State Board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      // Nếu column rỗng (chỉ chứa placeholder-card) thì xoá placeholder-card đi
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        // Ngược lại Column đã có card thì thêm card mới vào cuối mảng
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    dispatch(updateCurrentActiveBoard(newBoard))
  }

  // Hàm gọi API để cập nhật mảng columnOrderIds của Board và làm mới dữ liệu State Board
  const moveColumns = (dndOrderedColumnState) => {
    // Cập nhật dữ liệu State Board
    const dndOrderedColumnIds = dndOrderedColumnState.map(c => c._id)
    const newBoard = { ...board }
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
    const newBoard = { ...board }
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
    const newBoard = { ...board }
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

  // Xử lý xóa column
  const deleteColumnDetails = (columnId) => {
    // Cập nhật dữ liệu State Board
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(column => column._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Gọi API để xoá column
    deleteColumnDetailsAPI(columnId).then(res => {
      toast.success(res?.deleteResult)
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

        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCards={moveCards}
        moveCardtoDifferentColumn={moveCardtoDifferentColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  )
}

export default Board
