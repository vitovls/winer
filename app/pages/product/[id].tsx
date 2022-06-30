import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import Header from "../../components/Header"
import { IProduct } from "../../interfaces/IProducts"
import AppContext from "../../utils/AppContext"

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

  return (
    <div>
      <Header />
      <Link href="/">
        <h1>{"< Voltar"}</h1>
      </Link>
      <div>
        {
          product && product?.length > 0 && (
            <div>
              <Image src={product[0].image} width="500px" height="500px" />
              <section>
                <section>
                  <span>Vinhos</span>
                  <span>{" > "}</span>
                  <span>{product[0].country}</span>
                  <span>{" > "}</span>
                  <span>{product[0].region}</span>
                </section>
                <h2>{product[0].name}</h2>
                <section>
                  <Image src={product[0].flag} width="20px" height="20px"></Image>
                  <span>{product[0].country}</span>
                  <span>{product[0].type}</span>
                  <span>{product[0].classification}</span>
                  <span>{filterVolumeOrSize(product[0])}</span>
                  <span>{ratingStars(product[0].rating)}</span>
                  <span>{`(${product[0].avaliations})`}</span>
                </section>
                <section>
                  <p className="product-price-member">
                    R$
                    <strong>{product[0].priceMember.toFixed(2).split(".")[0]}</strong>
                    ,{product[0].priceMember.toFixed(2).split(".")[1]}
                  </p>
                </section>
                <section>
                  <h3>Comentário do Sommelier</h3>
                  <p>
                    {product[0].sommelierComment}
                  </p>
                </section>
              </section>
            </div>
          )
        }
        <div>
          <button onClick={() => addOrRemoveProduct("-")}>-</button>
          {`Quantity: ${quantity}`}
          <button onClick={() => addOrRemoveProduct("+")}>+ Adicionar</button>
        </div>
      </div>
    </div>
  )
}