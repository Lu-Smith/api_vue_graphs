<template>
  <h2>Graph</h2>
  <div :id="chartId" style="width: 100%; height: 400px;"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import { Transaction } from '../assets/intefaces';

const props = defineProps<{ transactions: Transaction[], chartId: string }>();

let myChart: echarts.ECharts | null = null;

onMounted(() => {
  myChart = echarts.init(document.getElementById(props.chartId) as HTMLElement);

  const labels = props.transactions.map(tx => tx.start_date); 
  const paymentData = props.transactions.map(tx => tx.payment);
  const benchmarkData = props.transactions.map(tx => tx.benchmark);

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
      data: labels,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Payment (€)',
        type: 'bar',
        data: paymentData,
        emphasis: {
          focus: 'series',
        },
      },
      {
        name: 'Benchmark (€)',
        type: 'bar',
        data: benchmarkData,
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