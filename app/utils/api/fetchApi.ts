import { IResponseProducts } from "../../interfaces/IProducts";

const BASE_URL = "https://wine-back-test.herokuapp.com/products";

async function fetchApiDefault(page: number): Promise<IResponseProducts> {
  const response = await fetch(`${BASE_URL}?page=${page}&limit=10`)
  const data = await response.json();
  return data;
}

async function fetchApiAll(): Promise<IResponseProducts> {
  const response = await fetch(`${BASE_URL}`);
  const data = await response.json();
  return data;
}

const fetchApi = {
  default: fetchApiDefault, 
  all: fetchApiAll
}

export default fetchApi;

