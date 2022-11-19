//setting Pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 10000000
  const offset = page ? page * limit : 0
  return { limit, offset }
}
//setting PagingData
const getPagingData = (data, page, limit) => {
  const { count: length, rows } = data
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(length / limit)
  return { length, rows, totalPages, currentPage }
}

module.exports = {
  getPagination: getPagination,
  getPagingData: getPagingData,
}
