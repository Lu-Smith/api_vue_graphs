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

export interface Transaction {
  provider_name: string;
  product_name: string,
  payment: number;
  benchmark : number;
  start_date : string,
  end_date : string,
}