<script setup lang="ts">
import { onMounted } from 'vue';
import {getExchangeRates, getProductBenchmarks} from './data/api';

onMounted(async () =>{
  try {
    const productBenchamrks = getProductBenchmarks();
    const exchangeRates = getExchangeRates();
    console.log('rates', exchangeRates);
    console.log('products', productBenchamrks);
  }
  catch (error) {
    console.error('Failed to fetch data:', error)
  }
})
</script>

<template>
  <h1>We Are Graphs</h1>

</template>

<style scoped>

</style>
