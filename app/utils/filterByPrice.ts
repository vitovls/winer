import { IProduct } from "../interfaces/IProducts";

export default function filterByPrice(data: IProduct[], price: number | number[]) {
  if (Array.isArray(price)) {
    const [min, max] = price;
    return data.filter((item) => item.price >= min && item.price <= max);
  }
  return data.filter(item => item.price === price);
}