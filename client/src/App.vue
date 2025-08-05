<script setup lang="ts">
import DiceDisplay from './components/DiceDisplay.vue';
import PricesTable from './components/PricesTable.vue';
import BetControls from './components/BetControls.vue';
import BalanceDisplay from './components/BalanceDisplay.vue';
import useGameState from './composables/useGameState';

const {
  dice,
  balance,
  bet,
  isRolling,
  lastWin,
  winningCombo,
  errorMessage,
  multipliers,
  rollDice
} = useGameState();
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
    <div class="w-full max-w-3xl">
      <!-- Error message -->
      <div v-if="errorMessage" class="bg-red-500 text-white p-3 mb-6 rounded text-center">
        {{ errorMessage }}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DiceDisplay :dice="dice" :isRolling="isRolling" />

        <PricesTable :multipliers="multipliers" :winningCombo="winningCombo" />

        <BetControls
          v-model:bet="bet"
          :balance="balance"
          :isRolling="isRolling"
          :onRoll="rollDice"
        />

        <BalanceDisplay :balance="balance" :lastWin="lastWin" />
      </div>

      <div class="mt-6 text-center text-gray-500 text-sm">
        <p>Yahtzee Dice Game simulator by kitbyte :)</p>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}
</style>
