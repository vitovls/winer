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

  .links-header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    width: 500px;
  }

  .links-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 252px;
    padding: 15px 15px 20px;
  }
`;

export default function Header() {
  return (
    <HeaderStyled>
      <Image className="logo" width="150px" height="150px" src="/wine-logo.png" />
      <section className="links-header">
        <a>Clube</a>
        <a>Loja</a>
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