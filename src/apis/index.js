import axios from 'axios'
import { API_ROOT } from '~/utilities/constants'

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // Lưu ý: axios sẽ trả về một object có cấu trúc { data, status, statusText, headers, config, request }
  return response.data
}