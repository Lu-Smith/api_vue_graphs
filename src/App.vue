<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getExchangeRates, getProductBenchmarks} from './data/api';
import { Transaction, ExchangeRates, ProductBenchmarks  } from './assets/intefaces';
import ProductBenchmarkComponent from './components/PaymentBenchmarksComponent.vue';

const transactions = ref<Transaction[]>([]);

onMounted(async () =>{
  try {
    const productBenchmarks = await getProductBenchmarks();
    const exchangeRates = await getExchangeRates();

    transactions.value = processProviderData(productBenchmarks.product_benchmarks, exchangeRates.exchange_rates);
  }
  catch (error) {
    console.error('Failed to fetch data:', error);
  }
});

const processProviderData = (benchmarks: ProductBenchmarks[], rates: ExchangeRates[]): Transaction[] => {
  const transactionList: Transaction[] = [];

  for (const benchmark of benchmarks) {
    const { provider_name, product_name, payment, currency, benchmark: benchmarkValue, start_date, end_date } = benchmark;
    
    let convertedPayment = payment;
    let convertedBenchmark = benchmarkValue;

    if (currency.name !== "EUR") {
      const startYear = new Date(start_date).getFullYear();

      const exchangeRateEntry = rates.find(rate =>
        rate.from_currency_id === currency.id && rate.year === startYear
      )

      if (exchangeRateEntry) {
        convertedPayment = payment * exchangeRateEntry.exchange_rate;
        convertedBenchmark = benchmarkValue * exchangeRateEntry.exchange_rate;
      }
    }

    transactionList.push({
      provider_name,
      product_name,
      payment: convertedPayment,
      benchmark: convertedBenchmark,
      start_date,
      end_date
    })
  }

  return transactionList;
}
</script>

<template>
  <h1 class="mb-4">We Are Graphs</h1>
  <ProductBenchmarkComponent :transactions="transactions"/>
</template>

