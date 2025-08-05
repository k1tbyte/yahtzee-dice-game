import {onMounted, ref} from 'vue';
import apiService from '../services/apiService';
import type {Multipliers} from '../types/game';

export default function useGameState() {
  const dice = ref<number[]>([1, 1, 3, 3, 3, 4]);
  const balance = ref(100);
  const bet = ref(30);
  const isRolling = ref(false);
  const lastWin = ref(0);
  const winningCombo = ref('');
  const errorMessage = ref('');
  const multipliers = ref<Multipliers>({
    'Pair': 1,
    '4+2': 2,
    'Yahtzee': 3,
    'Three Pairs': 4,
    'Other': 0
  });

  const initializeGame = async () => {
    try {
      errorMessage.value = '';
      const balanceData = await apiService.initializeGame();
      balance.value = balanceData.balance;

      multipliers.value = await apiService.getMultipliers();
    } catch (error) {
      console.error('Failed to initialize game:', error);
      errorMessage.value = 'Failed to connect to game server. Please try again.';
    }
  };

  const rollDice = async () => {
    if (isRolling.value || bet.value <= 0 || bet.value > balance.value) return;

    isRolling.value = true;
    winningCombo.value = '';
    errorMessage.value = '';

    // Simulate rolling animation
    const rollAnimation = setInterval(() => {
      dice.value = dice.value.map(() => Math.floor(Math.random() * 6) + 1);
    }, 100);

    try {
      const result = await apiService.rollDice(bet.value);

      // Stop animation after 1 second
      setTimeout(() => {
        clearInterval(rollAnimation);
        dice.value = result.dice;
        balance.value = result.balance;
        lastWin.value = result.win;
        winningCombo.value = result.combination;
        isRolling.value = false;
      }, 1000);
    } catch (error) {
      clearInterval(rollAnimation);
      isRolling.value = false;
      console.error('Failed to roll dice:', error);
      errorMessage.value = 'Failed to roll dice. Please try again.';
    }
  };

  onMounted(initializeGame);

  return {
    dice,
    balance,
    bet,
    isRolling,
    lastWin,
    winningCombo,
    errorMessage,
    multipliers,
    rollDice
  };
}
