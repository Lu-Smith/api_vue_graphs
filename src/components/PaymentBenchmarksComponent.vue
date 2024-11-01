<template>
  <div v-for="(groupProviderName, providerName) in groupTransactions.groupsProviderName" :key="providerName">
    <h3>Provider: {{ providerName }}</h3>
    <GraphComponent :transactions="groupProviderName" />
    <TableComponent :transactions="groupProviderName" />
  </div>
  <div v-for="(groupProductName, productName) in groupTransactions.groupsProductName" :key="productName" >
    <h3>Product: {{ productName }}</h3>
    <GraphComponent :transactions="groupProductName" />
    <TableComponent :transactions="groupProductName" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Transaction } from '../assets/intefaces';
import GraphComponent from './GraphComponent.vue';
import TableComponent from './TableComponent.vue';

const props = defineProps<{ transactions: Transaction[] }>();

//Group data

const groupTransactions = computed(() => {
  const groupsProviderName: Record<string, Transaction[]> = {};
  const groupsProductName: Record<string, Transaction[]> = {};

  props.transactions.forEach(transaction => {
    if(!groupsProviderName[transaction.provider_name]) groupsProviderName[transaction.provider_name] = [];
    if(!groupsProductName[transaction.product_name]) groupsProductName[transaction.product_name] = [];
    groupsProviderName[transaction.provider_name].push(transaction);
    groupsProductName[transaction.product_name].push(transaction);
  });

  return { groupsProviderName, groupsProductName };
});


</script>