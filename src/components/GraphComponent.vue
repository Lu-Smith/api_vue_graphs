<template>
  <h2>Graph</h2>
  <div :id="chartId" style="width: 100%; height: 400px;"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as echarts from 'echarts';
import { Transaction } from '../assets/intefaces';

const props = defineProps<{ transactions: Transaction[], chartId: string }>();

let myChart: echarts.ECharts | null = null;

const years = ref<number[]>([]);
const payments = ref<number[]>([]);
const benchmarks = ref<number[]>([]);

const extractYearlyData = () => {
  const yearlyPaymentData: Record<number, number> = {};
  const yearlyBenchmarkData: Record<number, number> = {};
  
  props.transactions.forEach(transaction => {
    const year = new Date(transaction.start_date).getFullYear();

    // Initialize if not already present
    if (!yearlyPaymentData[year]) yearlyPaymentData[year] = 0;
    if (!yearlyBenchmarkData[year]) yearlyBenchmarkData[year] = 0;

    // Accumulate values
    yearlyPaymentData[year] += transaction.payment;
    yearlyBenchmarkData[year] += transaction.benchmark;
  });

  // Sort years and map data to arrays
  years.value = Object.keys(yearlyPaymentData).map(Number).sort((a, b) => a - b);
  payments.value = years.value.map(year => yearlyPaymentData[year]);
  benchmarks.value = years.value.map(year => yearlyBenchmarkData[year]);
}

onMounted(() => {
  extractYearlyData();

  myChart = echarts.init(document.getElementById(props.chartId) as HTMLElement);


  //chart
  
  const options = {
    title: {
      text: 'Payment vs Benchmark',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Payment (€)', 'Benchmark (€)'],
    },
    xAxis: {
      type: 'category',
      data: years.value,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Payment (€)',
        type: 'bar',
        data: payments.value,
        emphasis: {
          focus: 'series',
        },
      },
      {
        name: 'Benchmark (€)',
        type: 'bar',
        data: benchmarks.value,
        emphasis: {
          focus: 'series',
        },
      },
    ],
  };

  myChart.setOption(options);


  //Resize
  window.addEventListener('resize', () => {
    myChart?.resize();
  });

  // Cleanup
  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => myChart?.resize());
    myChart?.dispose();
  });

});

//chart 
</script>