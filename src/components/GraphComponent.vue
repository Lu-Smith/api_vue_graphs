<template>
  <h2>Graph</h2>
  <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { Transaction } from '../assets/intefaces';

defineProps<{ transactions: Transaction[] }>();

const chartRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (chartRef.value) {
    const myChart = echarts.init(chartRef.value);
  }
});

//chart 
</script>