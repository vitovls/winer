import Image from "next/image";
import styled from "styled-components";
import { IProduct } from "../interfaces/IProducts";

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.grey};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  height: 80px;
  overflow: hidden;

  a {
    cursor: pointer;
  }


  .links-header {
    height: 100%;
    width: 70%;
    display: flex;
    cursor: pointer;
    
    
    a {
      padding: 10px;
    }

    .selected-link {
      border-bottom: 2px solid ${props => props.theme.colors.primary};
    }
  }

  .links-user {
    width: 20%;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px;

    .cart {
      position: relative;

      .cart-icon {
        position: absolute;
        bottom: 0px;
        right: 0px;
        background-color: ${props => props.theme.colors.white};
        border-radius: 50%;
        padding: 5px;
        font-size: 12px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    }
  }

`;

export default function Header({ cart }: { cart: IProduct[] }) {
  return (
    <HeaderStyled>
      <Image className="logo" width="150px" height="150px" src="/wine-logo.png" />
      <section className="links-header">
        <a>
          Clube
        </a>
        <a className="selected-link">
          Loja
        </a>
        <a>
          Produtores
        </a>
        <a>
          Ofertas
        </a>
        <a>
          Eventos
        </a>
      </section>
      <section className="links-user">
        <a>
          <Image width="56px" height="56px" src="/search-interface-symbol.png" />
        </a>
        <a>
          <Image width="56px" height="56px" src="/user.png" />
        </a>
        <a className="cart">
          <Image width="56px" height="56px" src="/winebox.png" />
          <span className="cart-icon">
            {cart.length}
          </span>
        </a>
      </section>
    </HeaderStyled>
  );
}