export default function priceWithDiscount(price:number, discount:number, type?:string):string {
  const priceDiscount = (price - (price * discount / 100)).toFixed(2);
  const splitNumber = priceDiscount.split(".");
  const priceDiscountInt = splitNumber[0];
  const priceDiscountDec = splitNumber[1];
  if (type === "int") {
    return priceDiscountInt;
  }
  if (type === "dec") {
    return priceDiscountDec;
  }
  return priceDiscount.replace(".", ",");
}
