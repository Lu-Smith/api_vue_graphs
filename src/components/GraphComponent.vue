<template>
  <h2>Graph</h2>
</template>

<script setup lang="ts">
import { Transaction } from '../assets/intefaces';

defineProps<{ transactions: Transaction[] }>();
</script>