<template>
  <table>
    <thead>
      <tr>
        <th> {{ name }} (€)</th>
        <th @click="changeSort('payment')"> 
          Payment (€)
          <span v-if="currentSort === 'payment'">
            {{ sortDirection === 'asc' ? '▲' : '▼' }}
          </span></th>
        <th @click="changeSort('benchmark')"> 
          Benchmark (€)
          <span v-if="currentSort === 'benchmark'">
            {{ sortDirection === 'asc' ? '▲' : '▼' }}
          </span>
        </th>
        <th @click="changeSort('difference')"> 
          Difference (€)
          <span v-if="currentSort === 'difference'">
            {{ sortDirection === 'asc' ? '▲' : '▼' }}
          </span>
        </th>
        <th @click="changeSort('start_date')"> 
          Start Date (€) 
          <span v-if="currentSort === 'start_date'">
            {{ sortDirection === 'asc' ? '▲' : '▼' }}
          </span>
        </th>
        <th @click="changeSort('end_date')"> 
          End Date (€)
          <span v-if="currentSort === 'end_date'">
            {{ sortDirection === 'asc' ? '▲' : '▼' }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(transaction, index) in sortTransactions" :key="index">
        <td>{{ transaction[oppositeKey] }}</td>
        <td>{{ transaction.payment.toFixed(2) }}</td>
        <td>{{ transaction.benchmark.toFixed(2) }}</td>
        <td>{{ (transaction.payment - transaction.benchmark).toFixed(2) }}</td>
        <td>{{ transaction.start_date }}</td>
        <td >{{ transaction.end_date }}</td>
      </tr>
      <tr>
        <td>Total Difference (€): </td>
        <td>{{ totalDifference.toFixed(2) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
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

//sort
const currentSort = ref< 'payment' | 'benchmark' | 'difference' | 'start_date' | 'end_date'>('start_date'); 
const sortDirection = ref<'asc' | 'desc'>('asc');

const changeSort = (column: ('payment' | 'benchmark' | 'difference' | 'start_date' | 'end_date')) => {
  
  if (currentSort.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    currentSort.value = column;
    sortDirection.value = 'asc';
  }
};

const sortTransactions = computed(() => {
  const sorted = [...props.transactions];

  sorted.sort((a, b) => {
    let comparison = 0;

    const differenceA = a.payment - a.benchmark;
    const differenceB = b.payment - b.benchmark;

    if (currentSort.value === 'difference') {
      // Compare the calculated differences
      comparison = differenceA - differenceB;
    } else if (['start_date', 'end_date'].includes(currentSort.value)) {
      // Compare dates
      comparison = new Date(a[currentSort.value]).getTime() - new Date(b[currentSort.value]).getTime();
    } else if (['payment'].includes(currentSort.value)) {
      // Compare numerical values for payment
      comparison = a.payment - b.payment;
    } else {
      // Compare numerical values for benchmark
      comparison = a.benchmark - b.benchmark;
    }
    
    return sortDirection.value === 'asc' ? comparison : -comparison;
  })

  return sorted
})
</script>