import React from "react";
import { IProduct } from "../interfaces/IProducts";

type AppContextType = {
  cart: IProduct[];
  setCart: (cart: IProduct[]) => void;
}

const AppContext = React.createContext<AppContextType>({
  cart: [],
  setCart: () => {},
});

export default AppContext;