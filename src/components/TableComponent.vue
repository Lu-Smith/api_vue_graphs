<template>
  <table>
    <thead>
      <tr>
        <th> {{ name }} (€)</th>
        <th> Payment (€)</th>
        <th> Benchmark (€)</th>
        <th> Difference (€)</th>
        <th> Start Date (€)</th>
        <th> End Date (€)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(transaction, index) in props.transactions" :key="index">
        <td>{{ transaction[oppositeKey] }}</td>
        <td>{{ transaction.payment.toFixed(2) }}</td>
        <td>{{ transaction.benchmark.toFixed(2) }}</td>
        <td>{{ (transaction.payment - transaction.benchmark).toFixed(2) }}</td>
        <td>{{ transaction.start_date }}</td>
        <td>{{ transaction.end_date }}</td>
      </tr>
      <tr>
        <td>Total Difference (€): </td>
        <td>{{ totalDifference.toFixed(2) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Transaction } from '../assets/intefaces';

const props = defineProps<{ transactions: Transaction[], keyName: 'provider_name' | 'product_name'}>();

//helpers

const name = computed(() => (props.keyName !== 'provider_name' ? 'Provider' : 'Product'));

const oppositeKey = computed(() => (props.keyName === 'provider_name' ? 'product_name' : 'provider_name'));

//total difference
const totalDifference  = computed(() => {
  return props.transactions.reduce((acc, transaction) => {
    return acc + (transaction.payment - transaction.benchmark);
  }, 0);
});

</script>