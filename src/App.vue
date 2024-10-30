<script setup lang="ts">
import { onMounted } from 'vue';
import {getProductBenchmarks, getExchangeRates} from './data/api';

onMounted(async () =>{
  try {
    console.log('product', getExchangeRates());
    console.log('rates', getProductBenchmarks());
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
