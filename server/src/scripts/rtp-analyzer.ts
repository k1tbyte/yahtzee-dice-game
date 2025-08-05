import {checkCombination, defaultMultipliersConfig, type MultiplierConfig, rollDice} from '../utils/game-logic.js';


interface SimulationResult {
  totalBets: number;
  totalWins: number;
  rtp: number;
  combinations: MultiplierConfig;
}

export function simulateGame(iterations: number, multipliers: MultiplierConfig): SimulationResult {
  const bet = 10;
  let totalBets = 0;
  let totalWins = 0;

  const combinations: MultiplierConfig = {
    YAHTZEE: 0,
    FOUR_PLUS_TWO: 0,
    THREE_PAIRS: 0,
    PAIR: 0,
    OTHER: 0
  };

  for (let i = 0; i < iterations; i++) {
    totalBets += bet;

    const dice = rollDice();
    const result = checkCombination(dice);

    switch(result.name) {
      case 'Yahtzee':
        combinations.YAHTZEE++;
        totalWins += bet * multipliers.YAHTZEE;
        break;
      case '4+2':
        combinations.FOUR_PLUS_TWO++;
        totalWins += bet * multipliers.FOUR_PLUS_TWO;
        break;
      case 'Three Pairs':
        combinations.THREE_PAIRS++;
        totalWins += bet * multipliers.THREE_PAIRS;
        break;
      case 'Pair':
        combinations.PAIR++;
        totalWins += bet * multipliers.PAIR;
        break;
      case 'Other':
        combinations.OTHER++;
        break;
    }
  }

  const rtp = (totalWins / totalBets) * 100;

  return {
    totalBets,
    totalWins,
    rtp,
    combinations
  };
}

function refineOptimization(
    multipliers: MultiplierConfig,
    targetRtp: number,
    iterations: number,
    maxAttempts: number = 5
): MultiplierConfig {
  let currentMultipliers = {...multipliers};

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const sim = simulateGame(iterations, currentMultipliers);
    if (Math.abs(sim.rtp - targetRtp) < 0.1) return currentMultipliers;

    const adjustment = targetRtp / sim.rtp;
    currentMultipliers = {
      YAHTZEE: Math.round(currentMultipliers.YAHTZEE * adjustment * 100) / 100,
      FOUR_PLUS_TWO: Math.round(currentMultipliers.FOUR_PLUS_TWO * adjustment * 100) / 100,
      THREE_PAIRS: Math.round(currentMultipliers.THREE_PAIRS * adjustment * 100) / 100,
      PAIR: Math.round(currentMultipliers.PAIR * adjustment * 100) / 100,
      OTHER: currentMultipliers.OTHER // This multiplier is not adjusted
    };

    applyMultiplierConstraints(currentMultipliers);
  }

  return currentMultipliers;
}

function applyMultiplierConstraints(multipliers: MultiplierConfig): void {
  // Min
  if (multipliers.PAIR < 0.5) multipliers.PAIR = 0.5;
  if (multipliers.FOUR_PLUS_TWO < 1) multipliers.FOUR_PLUS_TWO = 1;
  if (multipliers.THREE_PAIRS < 1.5) multipliers.THREE_PAIRS = 1.5;
  if (multipliers.YAHTZEE < 2) multipliers.YAHTZEE = 2;

  // Max
  if (multipliers.PAIR > 2) multipliers.PAIR = 2;
  if (multipliers.FOUR_PLUS_TWO > 6) multipliers.FOUR_PLUS_TWO = 6;
  if (multipliers.THREE_PAIRS > 8) multipliers.THREE_PAIRS = 8;
  if (multipliers.YAHTZEE > 12) multipliers.YAHTZEE = 12;
}


export function optimizeMultipliers(targetRtp: number = 95, iterations: number = 1000000): MultiplierConfig {

  const currentMultipliers = defaultMultipliersConfig();

  const initialSimulation = simulateGame(iterations, currentMultipliers);
  console.log('Initial RTP:', initialSimulation.rtp.toFixed(2) + '%');
  console.log('Combination distribution:', initialSimulation.combinations);

  const optimizedMultipliers = refineOptimization(currentMultipliers, targetRtp, iterations);

  const verificationSimulation = simulateGame(iterations, optimizedMultipliers);
  console.log('Optimized RTP:', verificationSimulation.rtp.toFixed(2) + '%');
  console.log('Optimized multipliers:', optimizedMultipliers);

  return optimizedMultipliers;
}

export function runRtpAnalysis(iterations: number = 1000000, targetRtp: number = 95): void {
  console.log('Running RTP analysis...');

  const currentMultipliers = defaultMultipliersConfig();

  const result = simulateGame(iterations, currentMultipliers);

  console.log(`=== RTP Analysis Results (${iterations.toLocaleString()} iterations) ===`);
  console.log('Total bets:', result.totalBets);
  console.log('Total wins:', result.totalWins);
  console.log('RTP:', result.rtp.toFixed(2) + '%');
  console.log('Combination occurrences:');
  console.log('- YAHTZEE:', result.combinations.YAHTZEE, `(${(result.combinations.YAHTZEE / iterations * 100).toFixed(4)}%)`);
  console.log('- 4+2:', result.combinations.FOUR_PLUS_TWO, `(${(result.combinations.FOUR_PLUS_TWO / iterations * 100).toFixed(4)}%)`);
  console.log('- Three Pairs:', result.combinations.THREE_PAIRS, `(${(result.combinations.THREE_PAIRS / iterations * 100).toFixed(4)}%)`);
  console.log('- Pair:', result.combinations.PAIR, `(${(result.combinations.PAIR / iterations * 100).toFixed(4)}%)`);
  console.log('- Other:', result.combinations.OTHER, `(${(result.combinations.OTHER / iterations * 100).toFixed(4)}%)`);

  console.log('\nOptimizing multipliers for target RTP of ' + targetRtp + '%...');
  optimizeMultipliers(targetRtp, iterations);
}

// Run analysis if file is executed directly
if (require.main === module) {
  const targetRtp = process.argv[2] ? Number(process.argv[2]) : 95;
  const iterations = process.argv[3] ? Number(process.argv[3]) : 1000000;

  runRtpAnalysis(iterations, targetRtp);
}