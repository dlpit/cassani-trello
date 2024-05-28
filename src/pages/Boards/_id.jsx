import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mapOrder } from '~/utilities/sorts'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CustomLoading from '~/assets/CustomLoading' // Import CustomLoading
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardtoDifferentColumnAPI
} from '~/apis'
import { genaratePlaceholderCard } from '~/utilities/formatters'
import { isEmpty } from 'lodash'
import { Typography } from '@mui/material'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // Tạm thời fix cứng Board ID, react-router-dom sẽ giúp chúng ta lấy ID từ URL
    const boardId = '6651788b2d70decdd157bdd9'
    // Gọi API để lấy dữ liệu Board
    fetchBoardDetailsAPI(boardId).then(board => {
      // Sắp xếp lại thứ tự của column theo columnOrderIds trước khi đưa dữ liệu xuống các tầng dưới
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(column => {
      // Thêm card placeholder vào mỗi column khi F5 trang và khi mở trang

        if (isEmpty(column.cards)) {
          column.cards = [genaratePlaceholderCard(column)]
          column.cardOrderIds = [genaratePlaceholderCard(column)._id]
        } else {
          // Sắp xếp lại thứ tự của card ở đây trước khi đưa dữ liệu xuống các tầng dưới
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])
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
    setBoard(newBoard)
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
    setBoard(newBoard)
  }

  // Hàm gọi API để cập nhật mảng columnOrderIds của Board và làm mới dữ liệu State Board
  const moveColumns = (dndOrderedColumnState) => {
    // Cập nhật dữ liệu State Board
    const dndOrderedColumnIds = dndOrderedColumnState.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumnState
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

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
    setBoard(newBoard)

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
    setBoard(newBoard)

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
      <Box sx = {{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        gap: 2
      }}>
        <CustomLoading />
        <Typography variant='h6'>Loading Board ...</Typography>
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
      />
    </Container>
  )
}

export default Board
