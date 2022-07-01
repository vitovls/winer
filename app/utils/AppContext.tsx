import React from "react";
import { IProduct } from "../interfaces/IProducts";

export type pagination = {
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
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  filter: string;
  setFilter: (filter: string) => void;
  query: string;
  setQuery: (query: string) => void;
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
  showModal: false,
  setShowModal: () => {},
  filter: "",
  setFilter: () => {},
  query: "",
  setQuery: () => {},
});

export default AppContext;