import axios from 'axios';
import type { RollResult, Multipliers } from '../types/game';

const API_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  async initializeGame(): Promise<{ balance: number }> {
    const response = await apiClient.get('/init');
    return response.data;
  },

  async getMultipliers(): Promise<Multipliers> {
    const response = await apiClient.get('/multipliers');
    return response.data;
  },

  async rollDice(bet: number): Promise<RollResult> {
    const response = await apiClient.post('/roll', { bet });
    return response.data;
  }
};
