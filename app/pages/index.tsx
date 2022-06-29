import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import { IResponseProducts } from "../interfaces/IProducts";
import FoundProducts from "../styles/ProductsFounds";


const StoreStyled = styled.div`
  background-color: ${props => props.theme.colors.background};
`;

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
    <StoreStyled>
        <Header />
        {
          products && (
            <>
              <FoundProducts><strong>{products.totalItems}</strong> produtos encontrados</FoundProducts>
              <ProductList products={products.items} />
            </>
          )
        }
    </StoreStyled>
  );
}
