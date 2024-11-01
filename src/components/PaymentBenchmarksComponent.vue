<template>
  <h2>Hello I am Table</h2>
</template>

<script setup lang="ts">
import { Transaction } from '../assets/intefaces';

defineProps<{ transactions: Transaction[] }>();
</script>