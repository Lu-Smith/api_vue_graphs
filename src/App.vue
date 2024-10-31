<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getExchangeRates, getProductBenchmarks, ExchangeRates, ProductBenchmarks } from './data/api';
import { Transaction } from './assets/intefaces';

const transaction = ref<Transaction[]>([]);

onMounted(async () =>{
  try {
    const productBenchamrks = await getProductBenchmarks();
    const exchangeRates = await getExchangeRates();

    transaction.value = processProviderData(productBenchamrks.product_benchmarks, exchangeRates.exchange_rates)

    console.log('rates', exchangeRates);
    console.log('products', productBenchamrks);
  }
  catch (error) {
    console.error('Failed to fetch data:', error)
  }
})

const processProviderData = (benchmarks: ProductBenchmarks, rates: ExchangeRates): Transaction[] => {
  const transactionList: Transaction[] = [];

  return transactionList;
}
</script>

<template>
  <h1>We Are Graphs</h1>

</template>

<style scoped>

</style>
