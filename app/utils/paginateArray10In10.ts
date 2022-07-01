import { IProduct } from "../interfaces/IProducts"

const paginateArray10In10 = (array: IProduct[], page: number) => {
  const start = (page - 1) * 10
  const end = start + 10
  return array.slice(start, end)
}

export default paginateArray10In10;