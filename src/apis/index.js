import axios from 'axios'
import { API_ROOT } from '~/utilities/constants'


/** Board */
// Đưa vào redux
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//   // Lưu ý: axios sẽ trả về một object có cấu trúc { data, status, statusText, headers, config, request }
//   return response.data
// }

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  // Lưu ý: axios sẽ trả về một object có cấu trúc { data, status, statusText, headers, config, request }
  return response.data
}

export const moveCardtoDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  // Lưu ý: axios sẽ trả về một object có cấu trúc { data, status, statusText, headers, config, request }
  return response.data
}

/** Columns */
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  // Lưu ý: axios sẽ trả về một object có cấu trúc { data, status, statusText, headers, config, request }
  return response.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  // Lưu ý: axios sẽ trả về một object có cấu trúc { data, status, statusText, headers, config, request }
  return response.data
}


/** Cards */
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}