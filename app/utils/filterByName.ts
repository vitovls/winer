import { IProduct } from "../interfaces/IProducts"

export default function filterByName(data:IProduct[], name:string):IProduct[] {
  return data.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
}
