export interface CombinationResult {
    name: string;
    multiplier: number;
}


export function rollDice(): number[] {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1);
}

/**
 * Checks the combination of dice and returns the name and multiplier
 * @param dice Array of dice values
 * @returns The result of the combination with the name and multiplier
 */
export function checkCombination(dice: number[]): CombinationResult {
    const counts: Record<number, number> = {};
    dice.forEach(value => {
        counts[value] = (counts[value] || 0) + 1;
    });

    const values = Object.values(counts).sort((a, b) => b - a);

    // Yahtzee - all 6 dice show the same value
    if (values[0] === 6) {
        return { name: 'Yahtzee', multiplier: 3 };
    }

    // 4+2 - 4 cubes of one value and 2 of another
    if (values.length === 2 && values[0] === 4 && values[1] === 2) {
        return { name: '4+2', multiplier: 2 };
    }

    // three pairs of identical values
    if (values.length === 3 && values[0] === 2 && values[1] === 2 && values[2] === 2) {
        return { name: 'Three Pairs', multiplier: 4 };
    }

    // Pair - at least one pair
    if (values[0] >= 2) {
        return { name: 'Pair', multiplier: 1 };
    }

    // No winning combination
    return { name: 'Other', multiplier: 0 };
}

/**
 * Analyzes the theoretical RTP (Return to Player) of the game
 * @param iterations Number of iterations for analysis
 * @returns RTP percentage
 */
export function analyzeRTP(iterations: number = 1000000): number {
    let totalBet = 0;
    let totalWin = 0;

    for (let i = 0; i < iterations; i++) {
        const bet = 10; // Fixed rate for analysis
        totalBet += bet;

        const dice = rollDice();
        const result = checkCombination(dice);

        totalWin += bet * result.multiplier;
    }

    return (totalWin / totalBet) * 100;
}