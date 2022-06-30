import Image from "next/image";
import styled from "styled-components";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${props => props.theme.colors.white};
  height: 80px;

  a {
    cursor: pointer;
  }
  
  .selected-link {
    color: ${props => props.theme.colors.primary};
    border-bottom: 2px solid ${props => props.theme.colors.primary};
  }

  .links-header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    width: 500px;

    a:hover {
        border-bottom: 2px solid ${props => props.theme.colors.primary};
        transition: 0.2s ease-in-out;
      }
    }

  .links-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 252px;
    padding: 15px 15px 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    height: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .links-header {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      a {
        margin-bottom: 20px;
      }
  }
`;

export default function Header() {
  return (
    <HeaderStyled>
      <Image className="logo" width="150px" height="150px" src="/wine-logo.png" />
      <section className="links-header">
        <a>Clube</a>
        <a className="selected-link">Loja</a>
        <a>Produtores</a>
        <a>Ofertas</a>
        <a>Eventos</a>
      </section>
      <section className="links-user">
        <a><Image width="56px" height="56px" src="/search-interface-symbol.png"/></a>
        <a><Image width="56px" height="56px" src="/user.png"/></a>
        <a><Image width="56px" height="56px" src="/winebox.png"/></a>
      </section>
    </HeaderStyled>
  );
}