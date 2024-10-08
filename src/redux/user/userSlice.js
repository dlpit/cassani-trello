import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utilities/authorizeAxios'
import { API_ROOT } from '~/utilities/constants'

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    // Lưu ý: axios sẽ trả về một object có cấu trúc { data, status, statusText, headers, config, request }
    return response.data
  }
)

// Khởi tạo giá trị State của một cái Slice trong Redux
const initialState = {
  currentUser: null
}

// Khởi tạo một cái Slice dữ liệu trong kho lưu trữ - Redux Store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducers: Nới xử lý dữ liệu đồng bộ
  reducers: {},
  // ExtraReducers: Nới xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
    // action.payload là chuẩn đặt tên khi nhận dữ liệu reducer, chúng ta sẽ gán nó ra một biến có nghĩa hơn, action.payload ở đây chính là response.data từ CreateAsyncThunk
      const user = action.payload
      state.currentUser = user
    })
  }
})

// Action creators are generated for each case reducer function
// Actions: Là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
// export const { } = userSlice.actions

// Selectors: Là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer