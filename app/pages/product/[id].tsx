import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import Header from "../../components/Header"
import Loading from "../../components/Loading"
import { IProduct } from "../../interfaces/IProducts"
import AppContext from "../../utils/AppContext"

const ProductPageStyled = styled.div`
  .back-btn {
    padding: 10px 40px;
    font-size: 2rem;
    
    a {
      text-decoration: none;
      cursor: pointer;
      color: ${props => props.theme.colors.text};~
      
    }
    
    span {
      cursor: pointer;
      margin-right: 20px;
    }
  }

  .container {
    display: flex;
    justify-content: space-evenly;
    cursor: default;
  }
  
  .container-infos {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 40%;
    padding: 20px;

    .nav-container {
      
      a {
        text-decoration: none;
        color: ${props => props.theme.colors.quaternary};
        font-weight: bold;
      }

      span {
        color: ${props => props.theme.colors.grey};
      }
    }

    .name-product {
      font-size: 2.5rem;
    }

    .container-details {
      display: flex;
      align-items: center;
      padding: 5px 0;

      span {
        padding: 0 10px;
      }
    }

    .product-price-member {
      display: flex;
      align-items: baseline;
      color: ${props => props.theme.colors.quaternary};
      font-size: 1.5rem;

      .arround-price {
        font-size: 2.5rem;
      }
    }

    .product-price-non-member {
      font-size: 1rem;
      color: ${props => props.theme.colors.grey};
      padding: 2px 0 20px 0;
      weight: bold;
    }

    .comment-section {
      display: flex;
      flex-direction: column;
      align-items: left;
      padding: 20px 0;

      .comment-section-title {
        padding: 0 0 20px 0;
        font-family: ${props => props.theme.fonts.secondary};
      }

      .comment-section-text {
        padding: 0 0 20px 0;
        font-family: ${props => props.theme.fonts.secondary};
        color: ${props => props.theme.colors.grey};
      }
    }

    .btn-container {
      background-color: ${props => props.theme.colors.secondary};
      width: 70%;
      height: 4rem;
      border-radius: 5px;
      color: ${props => props.theme.colors.white};
      font-size: 1.5rem;
      font-family: ${props => props.theme.fonts.secondary};
      display: flex;
      align-items: center;

      .btn-container-text {
        cursor: pointer;
        font-size: 1.5rem;
        font-family: ${props => props.theme.fonts.secondary};
        color: ${props => props.theme.colors.white};
        padding: 0 10px;
        background-color: ${props => props.theme.colors.secondary};
        border: none;
      }

      .btn-container-btn {
        margin: 1rem;
        height: 100%;
        background-color: ${props => props.theme.colors.secondary};
        width: 20%;
        border: none;
        cursor: pointer;

        span {
          border-radius: 50%;
          padding: 0.5rem;
          color: ${props => props.theme.colors.white};
          font-size: 1.5rem;
          font-family: ${props => props.theme.fonts.secondary};
          border: 1px solid ${props => props.theme.colors.white};
        }
        
        &:disabled {
          cursor: default;
          span {
            opacity: 0.5;
          }
        }

      }
    }

  }
`;


export default function Product() {

  const router = useRouter()

  const { cart, setCart } = useContext(AppContext)

  const [product, setProduct] = useState<IProduct[]>()

  const [quantity, setQuantity] = useState(0)

  const [loading, setLoading] = useState(true)

  const { id } = router.query

  const filterDataByIdProduct = (data: IProduct[]) => {
    return data.filter((item: IProduct) => item.id === Number(id))
  }

  const fetchApiProduct = async () => {
    const response = await fetch("https://wine-back-test.herokuapp.com/products")
    const data = await response.json()
    const filteredProducts = filterDataByIdProduct(data.items)
    setLoading(false)
    setQuantity(0)
    return setProduct(filteredProducts)
  }

  const fetchStorageProduct = async (data: any) => {
    const filteredProducts = filterDataByIdProduct(data)
    setProduct(filteredProducts)
    setQuantity(filteredProducts.length)
    setLoading(false)
  }

  const getProduct = async () => {
    const data = localStorage.getItem("cart")
    if (data) {
      const dataParse = JSON.parse(data)
      const dataFilter = filterDataByIdProduct(dataParse)
      if (dataFilter.length > 0) {
        fetchStorageProduct(dataParse)
      } else {
        fetchApiProduct()
      }
    }
  }

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartStorage);
    getProduct()
  }, [loading])

  const addOrRemoveProduct = (type: string) => {
    if (type === "+") {
      if (product) {
        console.log("clicou")
        const newData = [...cart, product[0]]
        setCart(newData)
        localStorage.setItem("cart", JSON.stringify(newData))
        const newQuantity = filterDataByIdProduct(newData).length
        setQuantity(newQuantity)
      }
    } else {
      const i = cart.findIndex((item: IProduct) => item.id === Number(id))
      if (i > -1) {
        console.log("clicou")
        const newData = [...cart]
        newData.splice(i, 1)
        setCart(newData)
        localStorage.setItem("cart", JSON.stringify(newData))
        const newQuantity = filterDataByIdProduct(newData).length
        setQuantity(newQuantity)
      }
    }
  }

  const filterVolumeOrSize = (product: IProduct) => {
    if (product.volume) {
      return product.volume
    } else {
      return product.size
    }
  }

  const ratingStars = (rating: number) => {
    const star = "★"
    const emptyStar = "☆"
    const stars = []
    for (let i = 0; i < rating; i++) {
      stars.push(star)
    }
    for (let i = 0; i < 5 - rating; i++) {
      stars.push(emptyStar)
    }
    return stars.join("")
  }

  const disabledButton = () => {
    if (quantity === 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <div>
    <Header />
    {
      loading ?
      <Loading height="100vh" width="" />
      :
      <ProductPageStyled>
      <div className="back-btn">
        <Link href="/">
          <div>
            <span>{"<"}</span>
            <span>Voltar</span>
          </div>
        </Link>
      </div>
      {
        product && product?.length > 0 && (
          <div className="container">
            <Image className="product-image" src={product[0].image} width="500px" height="500px" />
            <section className="container-infos">
              <section className="nav-container">
                <a>Vinhos</a>
                <span>{" > "}</span>
                <a>{product[0].country}</a>
                <span>{" > "}</span>
                <span>{product[0].region}</span>
              </section>
              <div>
                <h2 className="name-product">{product[0].name}</h2>
                <section className="container-details">
                  <Image src={product[0].flag} width="20px" height="20px"></Image>
                  <span>{product[0].country}</span>
                  <span>{product[0].type}</span>
                  <span>{product[0].classification}</span>
                  <span>{filterVolumeOrSize(product[0])}</span>
                  <span>{ratingStars(product[0].rating)}</span>
                  <span>{`(${product[0].avaliations})`}</span>
                </section>
              </div>
              <section>
                <span className="product-price-member">
                  <h3>R$</h3>
                  <h3 className="arround-price">{product[0].priceMember.toFixed(2).split(".")[0]}</h3>
                  <h3>,{product[0].priceMember.toFixed(2).split(".")[1]}</h3>
                </span>
                <h3 className="product-price-non-member">
                  {`NÃO SÓCIO R$${product[0].priceNonMember.toFixed(2)}`}
                </h3>
              </section>
              <section className="comment-section">
                <h3 className="comment-section-title">Comentário do Sommelier</h3>
                <p className="comment-section-text">
                  {product[0].sommelierComment}
                </p>
                <section className="btn-container">
                  <button disabled={disabledButton()} className="btn-container-btn" onClick={() => addOrRemoveProduct("-")}>
                    <span>-</span>
                  </button>
                  <span className="btn-container-quantity">
                    {quantity}
                  </span>
                  <button className="btn-container-btn" onClick={() => addOrRemoveProduct("+")}>
                    <span>+</span>
                  </button>
                  <button onClick={() => addOrRemoveProduct("+")} className="btn-container-text">
                    Adicionar
                  </button>
                </section>
              </section>
            </section>
          </div>
        )
      }
    </ProductPageStyled>
    }
  </div>
  )
}