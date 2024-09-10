import { API_ROOT } from '~/utilities/constants'
import authorizeAxiosInstance from '~/utilities/authorizeAxios'
import { toast } from 'react-toastify'

/** Board */
// Đưa vào redux
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
//   // Lưu ý: axios sẽ trả về một object có cấu trúc { data, status, statusText, headers, config, request }
//   return response.data
// }

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  // Lưu ý: authorizeAxiosInstance sẽ trả về một object có cấu trúc { data, status, statusText, headers, config, request }
  return response.data
}

export const moveCardtoDifferentColumnAPI = async (updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  // Lưu ý: authorizeAxiosInstance sẽ trả về một object có cấu trúc { data, status, statusText, headers, config, request }
  return response.data
}

/** Columns */
export const createNewColumnAPI = async (newColumnData) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  // Lưu ý: authorizeAxiosInstance sẽ trả về một object có cấu trúc { data, status, statusText, headers, config, request }
  return response.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
  // Lưu ý: authorizeAxiosInstance sẽ trả về một object có cấu trúc { data, status, statusText, headers, config, request }
  return response.data
}


/** Cards */
export const createNewCardAPI = async (newCardData) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}

/** User */
export const registerUserAPI = async (data) => {
  const respone = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/register`, data)
  toast.success('Register successfully! Please check your email to verify your account.')
  return respone.data
}

export const verifyUserAPI = async (data) => {
  const respone = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/verify`, data)
  toast.success('Verify successfully! Please login to your account.')
  return respone.data
}