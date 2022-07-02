import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import HeaderStyled from "../styles/Header.styled";
import AppContext from "../utils/AppContext";


export default function Header() {

  const { cart,
    cartQuantity,
    setCartQuantity,
    setShowModal,
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
      <Link href="/">
        <Image className="logo" width="150px" height="150px" src="/wine-logo.png" />
      </Link>
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
                onBlur={() => setShowInputSearch(false)}
                type="text"
                placeholder="Buscar"
                onChange={(e) => handleChangeSearch(e)}
                value={search}
                className="search-input"
              />

                <button className="search-btn" onClick={() => clickToSearch()} >
                  <Image width="20px" height="20px" src="/search.png" />
                </button>
            </div>
          ) : (
            <button onClick={() => setShowInputSearch(true)} className="search-disabled">
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