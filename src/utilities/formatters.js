export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

/**
 * Phía FE tạo ra một card placeholder đặc biệt, card này không có dữ liệu,
 * không liên quan tới BE, sẽ ẩn ở UI
 */
export const genaratePlaceholderCard = (column) => {

  return {
    // 1 lúc chỉ có tối đa 1 card placeholder
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}
