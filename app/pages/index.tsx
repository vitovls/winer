import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import MyHead from "../components/MyHead";
import ProductList from "../components/ProductList";
import { IResponseProducts } from "../interfaces/IProducts";
import GlobalStyle from "../styles/Global.styled";
import FoundProducts from "../styles/ProductsFounds";
import theme from "../styles/theme";

export default function Home() {

  const [products, setProducts] = useState<IResponseProducts>();

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  })

  useEffect(() => {
    fetch(`https://wine-back-test.herokuapp.com/products?page=${pagination.currentPage}&limit=10`)
      .then(res => res.json())
      .then((data) => {
        setProducts(data);
        setPagination({
          currentPage: data.page,
          totalPages: data.totalPages,
        });
      });
  }, [products])

  return (
    <>
      <MyHead />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {
          products && (
            <>
              <FoundProducts><strong>{products.totalItems}</strong> produtos encontrados</FoundProducts>
              <ProductList products={products.items} />
            </>
          )
        }
      </ThemeProvider>
    </>
  );
}
