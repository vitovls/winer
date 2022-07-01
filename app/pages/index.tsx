import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import FilterByPrice from "../components/FilterByPrice";
import Header from "../components/Header";
import Loading from "../components/Loading";
import ModalLinks from "../components/ModalLinks";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import { IProduct, IResponseProducts } from "../interfaces/IProducts";
import FoundProducts from "../styles/ProductsFounds";
import AppContext from "../utils/AppContext";


const StoreStyled = styled.div`
  background-color: ${props => props.theme.colors.background};

  .main {
    display: flex;
  }

  @media (max-width: 768px) {
    .main {
      align-items: center;
      flex-direction: column;
    }
  }
  

`;

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  font-weight: bold;
  margin-top: 20px;
  padding: 20px;
`;

export default function Home() {

  const BASE_URL = "https://wine-back-test.herokuapp.com/products";


  const [products, setProducts] = useState<IResponseProducts>();

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("");

  const { setCart,
    pagination: {
      page,
      totalPages,
    },
    setPagination,
    showModal } = useContext(AppContext)


  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartStorage);
  }, []);

  const paginateArray10In10 = (array: IProduct[], page:number) =>  {
    const start = (page - 1) * 10
    const end = start + 10
    return array.slice(start, end)
  }

  const filterByPrice = async (data: IResponseProducts, query: number | number[]) => {
    if (typeof query === "number" && query === 40) {
      setLoading(true);
      const dataFilter = data.items.filter((item: IProduct) => item.priceMember <= query);
      const pagingArray = paginateArray10In10(dataFilter, page);
      setProducts({
        items: pagingArray,
        totalPages: Math.ceil(dataFilter.length / 10),
        itemsPerPage: 10,
        page: page,
        totalItems: dataFilter.length,
      });
      setPagination({
        page: 1,
        totalPages: Math.ceil(dataFilter.length / 10),
      });
      return setLoading(false);
    }
    if (typeof query === "number" && query === 1000) {
      setLoading(true);
      const dataFilter = data.items.filter((item: IProduct) => item.priceMember >= query);
      const pagingArray = paginateArray10In10(dataFilter, page);
      setProducts({
        items: pagingArray,
        totalPages: Math.ceil(dataFilter.length / 10),
        itemsPerPage: 10,
        page: page,
        totalItems: dataFilter.length,
      });
      setPagination({
        page: 1,
        totalPages: Math.ceil(dataFilter.length / 10),
      });
      return setLoading(false)
    }
    const [min, max] = query as number[];
    const dataFilter = data.items.filter((item: IProduct) => item.priceMember >= min && item.priceMember <= max);
    setLoading(true);
    const pagingArray = paginateArray10In10(dataFilter, page);
    setProducts({
      page: 1,
      totalPages: Math.ceil(dataFilter.length / 10),
      itemsPerPage: 10,
      totalItems: dataFilter.length,
      items: pagingArray,
    });
    setPagination({
      page,
      totalPages: Math.ceil(dataFilter.length / 10),
    });
    return setLoading(false);
  }


  const filterData = async (filter: string) => {
    const response = await fetch(`${BASE_URL}`);
    const data = await response.json();

    if (filter === "40") {
      return filterByPrice(data, 40);
    }
    if (filter === "60") {
      return filterByPrice(data, [40, 60]);
    }
    if (filter === "200") {
      return filterByPrice(data, [100, 200]);
    }
    if (filter === "500") {
      return filterByPrice(data, [200, 500]);
    }
    if (filter === "1000") {
      return filterByPrice(data, 1000);
    }
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (filter !== "") {
        filterData(filter);
      } else {
        setLoading(true);
        fetch(`${BASE_URL}?page=${page}&limit=10`)
          .then(response => response.json())
          .then(data => {
            setProducts(data)
            setPagination({
              page: data.page,
              totalPages: data.totalPages,
            });
            setLoading(false);
          });
      }
    }, 300);
  }, [filter, page])

  useEffect(() => {
    setPagination({
      page: 1,
      totalPages,
    });
  }, [filter])


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
                    <NotFound>
                      <Image src="/sad-wine.png" alt="Not Found" width={300} height={300} />
                      <h3>Nenhum produto encontrado</h3>
                    </NotFound>
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
