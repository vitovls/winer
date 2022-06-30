import React from "react";
import { IProduct } from "../interfaces/IProducts";

type pagination = {
  page: number;
  totalPages: number;
}

type AppContextType = {
  cart: IProduct[];
  setCart: (cart: IProduct[]) => void;
  cartQuantity: number;
  setCartQuantity: (cartQuantity: number) => void;
  pagination: pagination;
  setPagination: (pagination: pagination) => void;
}

const AppContext = React.createContext<AppContextType>({
  cart: [],
  setCart: () => {},
  cartQuantity: 0,
  setCartQuantity: () => {},
  pagination: {
    page: 1,
    totalPages: 0,
  },
  setPagination: () => {},
});

export default AppContext;