<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  bet: number;
  balance: number;
  isRolling: boolean;
  onRoll: () => void;
}>();

const emit = defineEmits<{
  'update:bet': [value: number]
}>();

const handleBetChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:bet', Number(input.value));
};
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
    <h2 class="text-2xl font-bold text-center mb-4">Bet</h2>
    <div class="flex gap-4">
      <input
        :value="bet"
        @input="handleBetChange"
        type="number"
        min="1"
        :max="balance"
        class="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded text-center text-xl"
        :disabled="isRolling"
      />
      <button
        @click="onRoll"
        class="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed transition-colors duration-200 rounded font-bold text-xl"
        :disabled="isRolling || bet <= 0 || bet > balance"
      >
        {{ isRolling ? 'ROLLING...' : 'ROLL' }}
      </button>
    </div>
  </div>
</template>
