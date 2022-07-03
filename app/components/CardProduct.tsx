import Image from "next/image";
import { IProduct } from "../interfaces/IProducts";
import styled from "styled-components";
import { useContext } from "react";
import { useRouter } from "next/router";
import AppContext from "../utils/AppContext";
import priceWithDiscount from "../utils/priceWithDiscount";

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
  cursor: pointer;
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
    font-weight: bold;

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

@media (max-width: 768px) {
  padding: 0 0 0 20px;
}

`;

export default function CardProduct({ product }: { product: IProduct }) {

  const router = useRouter()

  const { setCartQuantity } = useContext(AppContext);

  const addToCart = () => {
    const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = [...cartStorage, product];
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartQuantity(newCart.length);
  }

  return (
    <StyledCardProduct>
      <div onClick={() => router.push(`/product/${product.id}`)}>
        <section className="product-container">
          <Image width="200px" height="180px" src={product.image} />
          <h3 className="product-title">{product.name}</h3>
          <section className="product-price">
            <span className="product-original-price">R${product.price.toFixed(2)}</span>
            <span className="product-discount-porcetage">{product.discount}% OFF</span>
            <section className="product-price-member-container">
              <h3 className="product-text-member">
                SÓCIO WINE
              </h3>
              <p className="product-price-member">
                R$
                <strong>
                {
                  priceWithDiscount(product.priceMember, product.discount, "int")
                }
                </strong>
                ,
                {priceWithDiscount(product.priceMember, product.discount, "dec")}
              </p>
            </section>
            <section className="product-price-no-member-container">
              NÃO SÓCIO R$ 
              {
                priceWithDiscount(product.price, product.discount, "")
              }
            </section>
          </section>
        </section>
      </div>
      <button onClick={() => addToCart()}>Adicionar</button>
    </StyledCardProduct>
  );
}