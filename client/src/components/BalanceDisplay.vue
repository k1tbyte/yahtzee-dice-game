<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{
  balance: number;
  lastWin: number;
}>();
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6 shadow-lg col-span-2">
    <h2 class="text-2xl font-bold text-center mb-4">Your balance</h2>
    <div class="text-3xl font-bold text-center">
      {{ balance }}
    </div>
    <div v-if="lastWin > 0" class="mt-2 text-green-400 text-center">
      +{{ lastWin }} last win!
    </div>
  </div>
</template>
