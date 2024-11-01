<template>
  <GraphComponent :transactions="transactions" />
  <TableComponent :transactions="transactions" />
</template>

<script setup lang="ts">
import { Transaction } from '../assets/intefaces';
import GraphComponent from './GraphComponent.vue';
import TableComponent from './TableComponent.vue';

defineProps<{ transactions: Transaction[] }>();
</script>