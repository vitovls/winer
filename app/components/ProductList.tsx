import styled from "styled-components";
import { IProduct } from "../interfaces/IProducts";
import CardProduct from "./CardProduct";

const StyledProductList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;


export default function ProductList({ products }: { products: IProduct[] }) {
  return (
    <>
      <StyledProductList>
        {products.map(product => (
          <CardProduct key={product.id} product={product} />
        ))}
      </StyledProductList>
    </>
  );
}