import type { AppProps } from 'next/app';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import MyHead from '../components/MyHead';
import { IProduct } from '../interfaces/IProducts';
import GlobalStyle from '../styles/Global.styled';
import theme from '../styles/theme';
import AppContext from '../utils/AppContext';

function MyApp({ Component, pageProps }: AppProps) {
  
  const [cart, setCart] = useState<IProduct[]>([]);

  const value = {
    cart,
    setCart,
  }

  return (
    <>
    <AppContext.Provider value={value}>
      <MyHead />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContext.Provider>
    </>
  );
}

export default MyApp;
