import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AppContext from "../utils/AppContext";

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

  .links-header-mobile-show-btn {
    display: none;
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
      color: ${props => props.theme.colors.primary};
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
}
}



  @media (max-width: 768px) {

    .links-header {
      display: none;
    }

    .links-user-search {
      display: none;
    }

    .links-user-person {
      display: none;
    }

    .links-header-mobile-show-btn {
      display: flex;
      border: none;
      background-color: transparent;
      cursor: pointer;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    }

    .links-user {
      width: 5rem;
      padding: 10px;
    }

    .links-user-cart {
      width: 5rem;
    }

    .links-user-personcart {
      position: relative;
    }
    
    .cart-icon {
      position: absolute;
      bottom: 0px;
      right: 0px;
      background-color: ${props => props.theme.colors.white};
      border-radius: 50%;
      padding: 5px;
      font-size: 12px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
      color: ${props => props.theme.colors.secondary};
      font-weight: bold;
    }
  }
`;

export default function Header() {

  const { cart,
    cartQuantity,
    setCartQuantity,
    setShowModal,
    setFilter,
    query,
    setQuery } = useContext(AppContext);

  const [showInputSearch, setShowInputSearch] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    setCartQuantity(cart.length);
  }, [cart]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  }

  const clickToSearch = () => {
    setQuery("")
    setTimeout(() => {
      setQuery(search)
      setSearch("")
    }, 300);
  }

  return (
    <HeaderStyled>
      <button onClick={() => setShowModal(true)} className="links-header-mobile-show-btn">
        <Image width="30px" height="30px" src="/mobile-show.png" />
      </button>
      <Image className="logo" width="150px" height="150px" src="/wine-logo.png" />
      <section className="links-header">
        <a>
          Clube
        </a>
        <Link href="/">
          <a className="selected-link">
            Loja
          </a>
        </Link>
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
        {
          showInputSearch ? (
            <div className="container-search">
              <input
                type="text"
                placeholder="Buscar"
                onChange={(e) => handleChangeSearch(e)}
                value={search}
              />
              <button onClick={() => clickToSearch()}>
                <Image width="20px" height="20px" src="/search.png" />
              </button>
            </div>
          ) : (
            <button onClick={() => setShowInputSearch(true)} className="">
              <Image width="56px" height="56px" src="/search.png" />
            </button>
          )
        }
        <a className="links-user-person">
          <Image width="56px" height="56px" src="/user.png" />
        </a>
        <a className="links-user-personcart">
          <Image width="56px" height="56px" src="/winebox.png" />
          <span className="cart-icon">
            {cartQuantity}
          </span>
        </a>
      </section>
    </HeaderStyled>
  );
}