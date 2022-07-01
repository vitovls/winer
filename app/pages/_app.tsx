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

  const [cartQuantity, setCartQuantity] = useState<number>(0);

  const [pagination, setPagination] = useState<{
    page: number;
    totalPages: number;
  }>({
    page: 1,
    totalPages: 0,
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  const [search, setSearch] = useState<boolean>(false);

  const [filter, setFilter] = useState<string>("");

  const [query, setQuery] = useState<string>("");

  const value = {
    cart,
    setCart,
    cartQuantity,
    setCartQuantity,
    pagination,
    setPagination,
    showModal,
    setShowModal,
    search,
    setSearch,
    filter,
    setFilter,
    query,
    setQuery,
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
