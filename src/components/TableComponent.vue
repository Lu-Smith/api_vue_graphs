<template>
  <table>
    <thead>
      <tr>
        <th> Payment (€)</th>
        <th> {{ name }} (€)</th>
        <th> Difference (€)</th>
        <th> Start Date (€)</th>
        <th> End Date (€)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>

        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Transaction } from '../assets/intefaces';

const props = defineProps<{ transactions: Transaction[], keyName: string }>();

const name = computed(() => (props.keyName !== 'providerName' ? 'Provider' : 'Product'));
</script>