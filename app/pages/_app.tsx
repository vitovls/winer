import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import MyHead from '../components/MyHead';
import GlobalStyle from '../styles/Global.styled';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MyHead />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
