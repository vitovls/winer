import Image from "next/image";
import { IProduct } from "../interfaces/IProducts";
import styled from "styled-components";
import ITheme from "../interfaces/ITheme";

const StyledCardProduct = styled.section`
background-color: #fff;
border-radius: 5px;	
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
padding: 20px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

.product-price {
  color: ${props => props.theme.colors.grey};
  text-decoration: line-through;
  margin-bottom: 10px;
}

.product-discount {
  background-color: ${props => props.theme.colors.orange};
  color: ${props => props.theme.colors.white};
  padding: 5px 10px;
`;

export default function CardProduct({ product }: { product: IProduct }) {
  return (
    <StyledCardProduct>
        <Image width="150px" height="150px" src={product.image} />
        <h3>{product.name}</h3>
        <section>
          <span className="product-price">R${product.price}</span>
          <span className="product-discount">{product.discount}% OFF</span>
          <div></div>
          <div>{product.priceMember}</div>
        </section>
    </StyledCardProduct>
  );
}