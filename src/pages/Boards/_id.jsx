import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI } from '~/apis'
import { genaratePlaceholderCard } from '~/utilities/formatters'
import { isEmpty } from 'lodash'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // Tạm thời fix cứng Board ID, react-router-dom sẽ giúp chúng ta lấy ID từ URL
    const boardId = '6651788b2d70decdd157bdd9'
    // Gọi API để lấy dữ liệu Board
    fetchBoardDetailsAPI(boardId).then(board => {
      // Thêm card placeholder vào mỗi column khi F5 trang và khi mở trang
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [genaratePlaceholderCard(column)]
          column.cardOrderIds = [genaratePlaceholderCard(column)._id]
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
    console.log('createdCard', createdCard)

    // Cập nhật dữ liệu State Board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }
  return (
    <Container disableGutters maxWidth='false' sx={{ height: '100vh'}}>
      <AppBar />
      {/* Optionnal chaining */}
      <BoardBar board={board}/>
      <BoardContent
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        board={board}/>
    </Container>
  )
}

export default Board
