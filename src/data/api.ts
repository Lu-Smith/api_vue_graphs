import axios from 'axios';

const BASE_URL = 'https://substantive.pythonanywhere.com';

const API_KEY = ' 590e3e17b6a26a8fcda726e2a91520e476e2c894';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'auth-key': API_KEY,
  },
});

export interface ProductBenchmarks {
  id : number,
  product_name: string,
  provider_name: string;
  end_date : string,
  start_date : string,
  currency : {
    id: number,
    name: string,
    symbol: string,
  },
  payment : number,
  benchmark : number
}

export interface ExchangeRates {
  exchange_rate : number,
  from_currency_id : number,
  to_currency_id : number,
  year : number
}

export const getProductBenchmarks =  async () => {
  const response = await apiClient.get<{ product_benchmarks: ProductBenchmarks[]}>('/product_benchmarks');
  return response.data;

}

export const getExchangeRates =  async () => {
  const response = await apiClient.get<{ exchange_rates: ExchangeRates[]}>('/exchange_rates');
  return response.data;
}

export default {
  getProductBenchmarks,
  getExchangeRates
}