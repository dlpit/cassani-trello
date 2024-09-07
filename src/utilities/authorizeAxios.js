import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utilities/formatters'

// Khởi tạo một đối tượng Axios (authorizeAxiosInstance) mục đích để custom và cấu hình chung cho dự án
let authorizeAxiosInstance = axios.create()

// Thời gian chờ tối đa của 1 request là 10 phút
authorizeAxiosInstance.defaults.timeout = 600000

// WithCredentials: Cho phép axios tự động gửi cookie trong mỗi request lên BE (phục vụ cho việc lưu JWT tokens (refresh & access) vào trong httpOnly cookie từ BE trả về)
authorizeAxiosInstance.defaults.withCredentials = true

/**
 * Cấu hình Interceptors (Bộ đánh chặn vào giữa mọi Request và Response)
 * https://axios-http.com/docs/interceptors
 */
// Add a request interceptor: Can thiệp vào giữa mỗi request trước khi nó được gửi đi
authorizeAxiosInstance.interceptors.request.use((config) => {
  // Do something before request is sent

  // Chặn tất cả các element có class 'interceptor-loading' để tránh user spam click
  interceptorLoadingElements(true)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor: can thiệp vào giữa mỗi response trước khi nó được trả về cho phía client
authorizeAxiosInstance.interceptors.response.use((response) => {
  // Mã http status code từ 200 đến 299 sẽ được xử lý ở đây

  // Chặn tất cả các element có class 'interceptor-loading' để tránh user spam click
  interceptorLoadingElements(false)
  return response
}, (error) => {
  // Mã http status code nằm ngoài khoảng từ 200 đến 299 sẽ được xử lý ở đây

  // Chặn tất cả các element có class 'interceptor-loading' để tránh user spam click
  interceptorLoadingElements(false)

  // Xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API ở đây
  console.log(error)
  let errorMessage = error.message
  if (error.response?.data?.message) {
    errorMessage = error.response.data.message
  }

  // Dùng react-toastify để hiên thị thông báo lỗi - trừ mã 410 - GONE phục vụ việc tự động refresh token.
  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }
  return Promise.reject(error)
})

export default authorizeAxiosInstance
