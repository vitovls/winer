import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import AppContext from "../utils/AppContext";

const ModalStyled = styled.div`
  position: fixed;
  background-color: ${props => props.theme.colors.primary};
  top: 0px;
  left: 0px;
  width: 75%;
  height: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  overflow: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);
  border-radius: 5px;
  animation: fadeIn 1.5s ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
  animation-duration: 1.5s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
  animation-duration: 1.5s;

  .logo-modal {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }

  .btn-close-modal {
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 10px;
    cursor: pointer;
    background-color: ${props => props.theme.colors.primary};
    border: none;
    font-size: 1.2rem;
    color: ${props => props.theme.colors.secondary};
  }

  .links-modal {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;

    a {
      padding: 10px;
      text-decoration: none;
      color: ${props => props.theme.colors.white};
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
    }
  }

`;



export default function ModalLinks() {

  const {setShowModal} = useContext(AppContext);

  return (
    <ModalStyled>
      <button onClick={() => setShowModal(false)} className="btn-close-modal">X</button>
      <Image className="logo-modal" src="/wine-logo.png" width={200} height={200} />
      <section className="links-modal">
      <Link href="/">
          <a>
            Loja
          </a>
        </Link>
        <Link href="/cart">
          <a>
            Carrinho
          </a>
        </Link>
        <Link href="/checkout">
          <a>
            Checkout
          </a>
        </Link>
      </section>
    </ModalStyled>
  )
}