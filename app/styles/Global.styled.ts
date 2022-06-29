import { createGlobalStyle } from "styled-components";
import ITheme from "../interfaces/ITheme";



const GlobalStyle = createGlobalStyle<{ theme: ITheme }>`
  * {
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: 400;
  }
  html, body, #root {
    height: 100%;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: 700;
  }
`;


export default GlobalStyle;