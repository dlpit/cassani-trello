import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from '~/utilities/constants'
import { mapOrder } from '~/utilities/sorts'
import { isEmpty } from 'lodash'
import { genaratePlaceholderCard } from '~/utilities/formatters'

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    // Lưu ý: axios sẽ trả về một object có cấu trúc { data, status, statusText, headers, config, request }
    return response.data
  }
)

// Khởi tạo giá trị State của một cái Slice trong Redux
const initialState = {
  currentActiveBoard: null
}

// Khởi tạo một cái Slice dữ liệu trong kho lưu trữ - Redux Store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Reducers: Nới xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên khi nhận dữ liệu reducer, chúng ta sẽ gán nó ra một biến có nghĩa hơn
      const board = action.payload

      // Xử lý dữ liệu cần thiết

      // Update lại dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    }
  },
  // ExtraReducers: Nới xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload là chuẩn đặt tên khi nhận dữ liệu reducer, chúng ta sẽ gán nó ra một biến có nghĩa hơn, action.payload ở đây chính là response.data từ CreateAsyncThunk
      const board = action.payload

      // Xử lý dữ liệu cần thiết
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
      // Update lại dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
// Actions: Là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selectors: Là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

// Cái file này tên là activeBoardSlice NHƯNG chúng ta sẽ export một thứ tên là Reducer, mọi người lưu ý :D
// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer