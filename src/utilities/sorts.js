// Sort Colunm and Cards

// Sắp xếp lại các phần tử của một mảng
export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []
  return [...originalArray].sort((a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]))
}

// // Can be written like this
// const mapOrder = (originalArray, orderArray, key) => {
//     if (!originalArray || !orderArray || !key) return []
//     const clonedArray = [...originalArray]
//     const orderedArray = clonedArray.sort((a, b) => {
//       return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
//     })
//     return orderedArray
//   }

// // Or like this
// function mapOrderSimple(originalArray, orderArray, key) {
// // Kiểm tra tính hợp lệ
//   if (!originalArray || !orderArray || !key) return []
//   // Tạo bản sao của mảng gốc
//   const clonedArray = [...originalArray]

//   // Tạo một mảng mới để lưu trữ kết quả
//   const orderedArray = []

//   // Duyệt qua mảng thứ tự
//   for (const id of orderArray) {
//     // Tìm kiếm phần tử trong mảng gốc có key phù hợp
//     const item = clonedArray.find(item => item[key] === id)

//     // Nếu tìm thấy, thêm phần tử vào mảng kết quả
//     if (item) {
//       orderedArray.push(item)

//       // Xóa phần tử khỏi mảng gốc để tránh trùng lặp
//       const index = clonedArray.indexOf(item)
//       clonedArray.splice(index, 1)
//     }
//   }

//   // Thêm các phần tử còn lại trong mảng gốc vào mảng kết quả
//   orderedArray.push(...clonedArray)

//   return orderedArray
// }
