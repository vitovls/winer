import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import FilterByPrice from "../components/FilterByPrice";
import Header from "../components/Header";
import Loading from "../components/Loading";
import ModalLinks from "../components/ModalLinks";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import { IProduct, IResponseProducts } from "../interfaces/IProducts";
import AppContext from "../utils/AppContext";
import isNumber from "../utils/isNumber";
import fetchApi from "../utils/api/fetchApi"
import paginateArray10In10 from "../utils/paginateArray10In10";
import StoreStyled from "../styles/store.styled";
import NotFoundProducts from "../styles/NotFoundProducts.styled";

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
    setFilter } = useContext(AppContext)


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
      page: 1,
      totalPages: Math.ceil(data.length / 10),
    });
  }

  const filterByPrice = async (data: IResponseProducts, query: number | number[]) => {
    if (typeof query === "number" && query === 40) {
      const dataFilter = data.items.filter((item: IProduct) => item.priceMember <= query);
      return setDataFilter(dataFilter);
    }
    if (typeof query === "number" && query === 1000) {
      const dataFilter = data.items.filter((item: IProduct) => item.priceMember >= query);
      return setDataFilter(dataFilter);
    }
    const [min, max] = query as number[];
    const dataFilter = data.items.filter((item: IProduct) => item.priceMember >= min && item.priceMember <= max);
    return setDataFilter(dataFilter);
  }


  const filterDataByPrice = async (filter: string) => {
    const data = await fetchApi.all()
    switch (filter) {
      case "40":
        filterByPrice(data, 40);
        break;
      case "60":
        filterByPrice(data, [40, 60]);
        break;
      case "200":
        filterByPrice(data, [100, 200]);
        break;
      case "500":
        filterByPrice(data, [200, 500]);
        break;
      case "1000":
        filterByPrice(data, 1000);
      default:
        break;
    }
  }

  const filterDataByName = (filter: string) => {
    console.log(filter)
  }

  const filterDataBy = () => {
    if (isNumber(filter)) {
      return filterDataByPrice(filter);
    } else {
      return filterDataByName(filter);
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
      if (filter) {
        filterDataBy().then(() => setLoading(false));
      }
      fetchDataApi().then(() => setLoading(false));
    }, 300);
  }, [filter, page])

  useEffect(() => {
    setPagination({
      page: 1,
      totalPages,
    });
  }, [filter])

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
            <FilterByPrice actions={{ filter, setFilter }} />
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
