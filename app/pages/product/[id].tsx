import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { IProduct } from "../../interfaces/IProducts"

export default function Product() {

  const router = useRouter()

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
    getProduct()
  }, [loading])

  return (
    <div>
      <h1>Product</h1>
      <div>
        {
          product && product?.length > 0 && (
            <div>
              <h2>{product[0].name}</h2>
              <p>{product[0].country}</p>
              <p>{product[0].price}</p>
            </div>
          )
        }
        <div>
          {`Quantity: ${quantity}`}
        </div>
      </div>
    </div>
  )
}