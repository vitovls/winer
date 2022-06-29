import styled from "styled-components";
import { IProduct, IResponseProducts } from "../interfaces/IProducts";
import FoundProducts from "../styles/ProductsFounds";
import CardProduct from "./CardProduct";

const MainProducts = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledProductList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  width: 100%;
  padding-right: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;


export default function ProductList({ products }: { products: IResponseProducts }) {
  return (
    <MainProducts>
      <FoundProducts><strong>{products.totalItems}</strong> produtos encontrados</FoundProducts>
      <StyledProductList>
        {products.items.map(product => (
          <CardProduct key={product.id} product={product} />
        ))}
      </StyledProductList>
    </MainProducts>
  );
}