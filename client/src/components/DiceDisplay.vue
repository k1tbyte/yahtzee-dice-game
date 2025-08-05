<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  dice: number[];
  isRolling: boolean;
}>();

// Dice dot positions
const dotPositions = {
  1: ['center'],
  2: ['top-left', 'bottom-right'],
  3: ['top-left', 'center', 'bottom-right'],
  4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
  5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
  6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
};

// Get position classes for dots
const getDotClass = (position: string): string => {
  switch (position) {
    case 'top-left': return 'top-2 left-2';
    case 'top-right': return 'top-2 right-2';
    case 'middle-left': return 'top-1/2 left-2 -translate-y-1/2';
    case 'middle-right': return 'top-1/2 right-2 -translate-y-1/2';
    case 'bottom-left': return 'bottom-2 left-2';
    case 'bottom-right': return 'bottom-2 right-2';
    case 'center': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    default: return '';
  }
};
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6 shadow-lg col-span-2">
    <h2 class="text-2xl font-bold text-center mb-6">Dice</h2>
    <div class="flex justify-center flex-wrap gap-4">
      <div
        v-for="(value, index) in dice"
        :key="index"
        class="w-16 h-16 bg-gray-700 border-2 border-gray-600 rounded relative"
        :class="{'animate-pulse': isRolling}"
      >
        <div
          v-for="(position, dotIndex) in dotPositions[value]"
          :key="`dot-${index}-${dotIndex}`"
          class="absolute w-3 h-3 bg-white rounded-full"
          :class="getDotClass(position)"
        ></div>
      </div>
    </div>
  </div>
</template>
