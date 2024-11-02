<template>
  <h2>Summary</h2>
  <button @click="changeAllGraph('rose')">Graph 1</button>
  <button @click="changeAllGraph('ring')">Graph 2</button>
  <button @click="changeAllGraph('basic')">Graph 3</button>
  <div id="allCharts" style="width: 100%; height: 400px;"></div>
</template>

<script setup lang="ts">
  import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue';
  import * as echarts from 'echarts';
  import { Transaction } from '../assets/intefaces';

  const props = defineProps<{ transactions: Transaction[]}>();

  let myChart: echarts.ECharts | null = null;

  //Change Graph

  type chartType = 'rose' | 'basic' | 'ring' ;
  const typeAllChart = ref<chartType>('rose');


  const changeAllGraph = (type: chartType) => {
    typeAllChart.value = type;
  }

  const groupProviders = computed(() => {
    const groupsProviderName: Record<string, { payments: number; benchmarks: number }> = {};

    props.transactions.forEach(transaction => {
      if(!groupsProviderName[transaction.provider_name]) groupsProviderName[transaction.provider_name] = { payments: 0, benchmarks: 0 };
      groupsProviderName[transaction.provider_name].payments += Math.round(transaction.payment);
      groupsProviderName[transaction.provider_name].benchmarks += Math.round(transaction.benchmark);
    });

    return groupsProviderName;
  });


const setChartOptions = () => {
  if (!myChart) return;

  const providerNames = Object.keys(groupProviders.value);
  const data = providerNames.map(name => ({
    name,
    value: groupProviders.value[name].payments,
    benchmark: groupProviders.value[name].benchmarks,
  }));

  const options = {
    title: {
      text: 'Providers',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: { name: string; value: number }) => {
        const benchmarkValue = data.find(item => item.name === params.name)?.benchmark;
        return `${params.name}<br>Payments: €${params.value}<br>Benchmark: €${benchmarkValue}`;
      }
    },
    legend: {
      orient: 'horizontal',
      bottom: '0%',
    },
    series: [
      {
        name: 'Pyments',
        type: typeAllChart.value === 'ring' ? 'pie' : 'pie',
        radius: typeAllChart.value === 'ring' ? ['40%', '70%'] : typeAllChart.value === 'rose' ? ['20%', '60%'] : '50%',
        roseType: typeAllChart.value === 'rose' ? 'radius' : undefined,
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  myChart.setOption(options);
};

onMounted(() => {
  myChart = echarts.init(document.getElementById('allCharts') as HTMLElement);
  setChartOptions();  

  window.addEventListener('resize', () => {
    myChart?.resize();
  });
});

watch([() => props.transactions, typeAllChart], () => {;
  setChartOptions();
}, { deep: true });

// Cleanup on component unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => myChart?.resize());
  myChart?.dispose();
});

</script>