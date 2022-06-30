import { useEffect, useState } from "react";
import styled from "styled-components";
import FilterByPrice from "../components/FilterByPrice";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import { IProduct, IResponseProducts } from "../interfaces/IProducts";


const StoreStyled = styled.div`
  background-color: ${props => props.theme.colors.background};

  .main {
    display: flex;
  }

  .loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    
    .circle-loading {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      border: 5px solid ${props => props.theme.colors.primary};
      border-top: 5px solid ${props => props.theme.colors.secondary};
      border-bottom: 5px solid ${props => props.theme.colors.secondary};
      animation: spin 1s linear infinite;
      margin-top: 20px;

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    }
  }
`;

export default function Home() {

  const BASE_URL = "https://wine-back-test.herokuapp.com/products";


  const [products, setProducts] = useState<IResponseProducts>();

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("");

  const filterByPrice = async (data: IResponseProducts, query: number | number[]) => {
    if (typeof query === "number" && query === 40) {
      setLoading(true);
      const dataFilter = data.items.filter((item: IProduct) => item.priceMember <= query);
      setProducts({
        page: 1,
        totalPages: dataFilter.length / 10,
        itemsPerPage: 10,
        totalItems: dataFilter.length,
        items: dataFilter,
      });
      return setLoading(false);
    }
    if (typeof query === "number" && query === 1000) {
      setLoading(true);
      const dataFilter = data.items.filter((item: IProduct) => item.priceMember >= query);
      setProducts({
        page: 1,
        totalPages: dataFilter.length / 10,
        itemsPerPage: 10,
        totalItems: dataFilter.length,
        items: dataFilter,
      });
      return setLoading(false)
    }
      const [min, max] = query as number[];
      const dataFilter = data.items.filter((item: IProduct) => item.priceMember >= min && item.priceMember <= max);
      setLoading(true);
      setProducts({
        page: 1,
        totalPages: dataFilter.length / 10,
        itemsPerPage: 10,
        totalItems: dataFilter.length,
        items: dataFilter,
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
    if (filter !== "") {
      filterData(filter);
    } else {
      setLoading(true);
      fetch(`${BASE_URL}`)
        .then(response => response.json())
        .then(data => {
          setProducts(data)
          setLoading(false);
        });
    }
  }, [filter])

  return (
    <StoreStyled>
      <Header />
      <>
        <section className="main">
          <FilterByPrice actions={{ filter, setFilter }} />
          {
            loading ? (
              <section className="loading">
                <h3>Carregando...</h3>
                <div className="circle-loading" />
              </section>
            ) : 
            (
              products && (
                <ProductList products={products} />
              )
            )
          }
        </section>
      </>
    </StoreStyled>
  );
}
