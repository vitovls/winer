import { Dispatch, SetStateAction } from 'react'
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AsideFilter from "../components/AsideFilter";
import Header from "../components/Header";
import Loading from "../components/Loading";
import ModalLinks from "../components/ModalLinks";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import { IProduct, IResponseProducts } from "../interfaces/IProducts";
import AppContext from "../utils/AppContext";
import fetchApi from "../utils/api/fetchApi"
import paginateArray10In10 from "../utils/paginateArray10In10";
import StoreStyled from "../styles/Store.styled";
import NotFoundProducts from "../styles/NotFoundProducts.styled";
import filterByName from "../utils/filterByName";
import filterByPrice from "../utils/filterByPrice";

export default function Home() {

  const [products, setProducts] = useState<IResponseProducts>();

  const [loading, setLoading] = useState(true);

  const { setCart,
    pagination: {
      page,
      totalPages,
    },
    setPagination,
    showModal,
    filter,
    setFilter,
    query } = useContext(AppContext)


  const setDataFilter = (data: IProduct[]) => {
    const pagingArray = paginateArray10In10(data, page);
    setProducts({
      items: pagingArray,
      totalPages: Math.ceil(data.length / 10),
      itemsPerPage: 10,
      page: page,
      totalItems: data.length,
    });
    setPagination({
      totalPages: Math.ceil(data.length / 10),
      page
    })
  }

  const filterDataByPrice = (data: IResponseProducts, filter: string) => {
    let dataFilter

    switch (filter) {
      case "40":
        dataFilter = filterByPrice(data.items, 40);
        break;
      case "60":
        console.log(data.items)
        dataFilter = filterByPrice(data.items, [40, 60]);
        break;
      case "200":
        dataFilter = filterByPrice(data.items, [60, 200]);
        break;
      case "500":
        dataFilter = filterByPrice(data.items, [200, 500]);
        break;
      default:
        dataFilter = filterByPrice(data.items, 1000);
        break;
    }
    return dataFilter;
  }

  const filterDataByName = (data: IResponseProducts, query: string) => {
    return filterByName(data.items, query);
  }

  const filterDataByNameAndPrice = (data: IResponseProducts, filter: string, query: string) => {
    const dataFilterByPrice = filterDataByPrice(data, filter);
    return filterByName(dataFilterByPrice, query);
  }

  const filterDataBy = async () => {
    const data = await fetchApi.all()
    if (filter && !query) {
      const dataFilter = filterDataByPrice(data, filter);
      return setDataFilter(dataFilter);
    }
    if (!filter && query) {
      const dataFilter = filterDataByName(data, query);
      return setDataFilter(dataFilter);
    }
    if (filter && query) {
      const dataFilter = filterDataByNameAndPrice(data, filter, query);
      return setDataFilter(dataFilter);
    }
  }

  const fetchDataApi = async () => {
    const data = await fetchApi.default(page);
    setProducts(data)
    setPagination({
      page: data.page,
      totalPages: data.totalPages,
    })
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (filter || query) {
        filterDataBy()
      } else {
        fetchDataApi()
      }
    }, 300);
    setLoading(false);
  }, [filter, query, page])

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartStorage);
  }, []);

  return (
    <>
      {
        showModal && <ModalLinks />
      }
      <StoreStyled>
        <Header />
        <>
          <section className="main">
            <AsideFilter />
            {
              loading ? (
                <Loading height="100vh" width="70vw" />
              ) :
                (
                  products && products.items.length > 0 ? (
                    <ProductList products={products} />
                  ) : (
                    <NotFoundProducts>
                      <Image src="/sad-wine.png" alt="Not Found" width={300} height={300} />
                      <h3>Nenhum produto encontrado</h3>
                    </NotFoundProducts>
                  )
                )
            }
          </section>
        </>
      </StoreStyled>
      <Pagination />
    </>
  );
}
