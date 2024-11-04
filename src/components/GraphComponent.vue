<template>
  <h2>Graph</h2>
  <button  class="m-4" @click="changeGraph('bar', 'bar')">Graph 1</button>
  <button  class="m-4" @click="changeGraph('line', 'bar')">Graph 2</button>
  <button  class="m-4" @click="changeGraph('line', 'scatter')">Graph 3</button>
  <div :id="chartId" style="width: 100%; height: 400px;"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import * as echarts from 'echarts';
import { Transaction } from '../assets/intefaces';

const props = defineProps<{ transactions: Transaction[], chartId: string }>();

let myChart: echarts.ECharts | null = null;

const years = ref<number[]>([]);
const payments = ref<number[]>([]);
const benchmarks = ref<number[]>([]);

//Change Graph

type BenchmarkChartType = 'bar' | 'line' | 'scatter' ;
const typeBenchmarkChart = ref<BenchmarkChartType>('bar');

type PaymentChartType = 'bar' | 'line' | 'scatter' ;
const typePaymentChart = ref<PaymentChartType>('bar');

const changeGraph = (typeBenchmark: BenchmarkChartType, typePayment: PaymentChartType,) => {
  typeBenchmarkChart.value = typeBenchmark;
  typePaymentChart.value = typePayment;
}

const extractYearlyData = () => {
  const yearlyPaymentData: Record<number, number> = {};
  const yearlyBenchmarkData: Record<number, number> = {};
  
  props.transactions.forEach(transaction => {
    const year = new Date(transaction.start_date).getFullYear();

    // Initialize if not already present
    if (!yearlyPaymentData[year]) yearlyPaymentData[year] = 0;
    if (!yearlyBenchmarkData[year]) yearlyBenchmarkData[year] = 0;

    // Accumulate values
    yearlyPaymentData[year] += Math.round(transaction.payment);
    yearlyBenchmarkData[year] += Math.round(transaction.benchmark);
  });

  // Sort years and map data to arrays
  years.value = Object.keys(yearlyPaymentData).map(Number).sort((a, b) => a - b);
  payments.value = years.value.map(year => yearlyPaymentData[year]);
  benchmarks.value = years.value.map(year => yearlyBenchmarkData[year]);
}

const setChartOptions = () => {
  if (!myChart) return;

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
        type: typePaymentChart.value,
        data: payments.value,
        emphasis: {
          focus: 'series',
        },
      },
      {
        name: 'Benchmark (€)',
        type: typeBenchmarkChart.value,  // Dynamic type based on toggle
        data: benchmarks.value,
        emphasis: {
          focus: 'series',
        },
      },
    ],
  };

  myChart.setOption(options);
};

onMounted(() => {
  extractYearlyData();
  myChart = echarts.init(document.getElementById(props.chartId) as HTMLElement);
  setChartOptions();  // Initial render

  // Resize listener
  window.addEventListener('resize', () => {
    myChart?.resize();
  });
});

// Watch for changes to re-render chart on update
watch([() => props.transactions, typeBenchmarkChart, typePaymentChart], () => {
  extractYearlyData();
  setChartOptions();
});

// Cleanup on component unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => myChart?.resize());
  myChart?.dispose();
});
 
</script>