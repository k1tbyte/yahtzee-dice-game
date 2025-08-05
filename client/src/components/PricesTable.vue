<script setup lang="ts">
import { defineProps } from 'vue';
import type { Multipliers } from '../types/game';
defineProps<{
  multipliers: Multipliers;
  winningCombo: string;
}>();
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
    <h2 class="text-2xl font-bold text-center mb-4">Prices</h2>
    <div
      v-for="(multiplier, combo) in multipliers"
      :key="combo"
      class="flex justify-between items-center mb-2"
      :class="{'text-red-400 font-bold': winningCombo === combo}"
    >
      <span class="text-lg">{{ combo }}</span>
      <span class="font-mono">x{{ multiplier }}</span>
    </div>
  </div>
</template>
