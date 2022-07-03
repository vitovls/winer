import { IProduct } from "../interfaces/IProducts";
import priceWithDiscount from "./priceWithDiscount";


export default function filterByPrice(data: IProduct[], price: number | number[]):IProduct[] {
  if (Array.isArray(price)) {
    const [min, max] = price;
    const newData = data.filter((item) => item.price >= min && item.price <= max)
    console.log(newData)
    return newData
  }
  if (price === 40) {
    const newData = data.filter((item) => item.price <= price)
    console.log(newData)
    return newData
  }
  else {
    const newData = data.filter((item) => item.price >= price)
    console.log(newData)
    return newData
  }
}
