import Image from "next/image";
import { IProduct } from "../interfaces/IProducts";
import styled from "styled-components";
import ITheme from "../interfaces/ITheme";

const StyledCardProduct = styled.section`
.product-container {
  background-color: ${props => props.theme.colors.white};
  border-radius: 5px;	
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 350px;
}

.product-title {
  font-size: 16px;
  text-align: center;
  margin: 10px 0 10px 0;
}

.product-price {
  .product-original-price {
    color: ${props => props.theme.colors.grey};
    text-decoration: line-through;
    margin: 20px 15px 20px 30px;
    font-size: 11px;
  }
  
  .product-discount-porcetage {
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    padding: 2px 5px;
    font-size: 11px;
  }
  
  .product-price-member-container {
    display: flex;
    align-items: center;
    font-size: 11px;
    padding: 10px 5px;
    weight: bold;

    .product-price-member {
      padding: 0 5px;
      font-size: 11px;
      color: ${props => props.theme.colors.quaternary};
      
      strong {
        font-size: 23px;
      }
    }

    .product-text-member {
      padding: 0 5px;
    }
  }

  .product-price-no-member-container {
    font-size: 11px;
    text-align: center;
    color: ${props => props.theme.colors.grey};
  }
}

button {
  background-color: ${props => props.theme.colors.secondary};
  border: none;
  border-radius: 5px;
  color: ${props => props.theme.colors.white};
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
}
`;

export default function CardProduct({ product }: { product: IProduct }) {
  return (
    <>
      <StyledCardProduct>
        <section className="product-container">
          <Image width="200px" height="180px" src={product.image} />
          <h3 className="product-title">{product.name}</h3>
          <section className="product-price">
            <span className="product-original-price">R${product.price}</span>
            <span className="product-discount-porcetage">{product.discount}% OFF</span>
            <section className="product-price-member-container">
              <h3 className="product-text-member">
                SÓCIO WINE
              </h3>
              <p className="product-price-member">
                R$
                <strong>{product.priceMember.toFixed(2).split(".")[0]}</strong>
                ,{product.priceMember.toFixed(2).split(".")[1]}
              </p>
            </section>
            <section className="product-price-no-member-container">
                NÃO SÓCIO R$ {product.priceNonMember}
            </section>
          </section>
        </section>
        <button>Adicionar</button>
      </StyledCardProduct>
    </>
  );
}