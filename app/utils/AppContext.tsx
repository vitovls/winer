import React from "react";
import { IProduct } from "../interfaces/IProducts";

type AppContextType = {
  cart: IProduct[];
  setCart: (cart: IProduct[]) => void;
  cartQuantity: number;
  setCartQuantity: (cartQuantity: number) => void;
}

const AppContext = React.createContext<AppContextType>({
  cart: [],
  setCart: () => {},
  cartQuantity: 0,
  setCartQuantity: () => {},
});

export default AppContext;