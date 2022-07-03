import { IProduct } from "../interfaces/IProducts";
import priceWithDiscount from "./priceWithDiscount";


export default function filterByPrice(data: IProduct[], price: number | number[]) {
  if (Array.isArray(price)) {
    const [min, max] = price;
    return data.filter((item) => Number(priceWithDiscount(item.price, item.discount)) >= min && Number(priceWithDiscount(item.price, item.discount)) <= max)
  }
  return data.filter(item => Number(priceWithDiscount(item.price, item.discount)) === price);
}
