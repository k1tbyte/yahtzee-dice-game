import fs from 'fs/promises';
import path from 'path';
import {optimizeMultipliers} from "../scripts/rtp-analyzer";

export interface CombinationResult {
    name: string;
    multiplier: number;
}

export interface MultiplierConfig {
    YAHTZEE: number;
    FOUR_PLUS_TWO: number;
    THREE_PAIRS: number;
    PAIR: number;
    OTHER: number;
}

export interface GameConfig {
    multipliers: MultiplierConfig;
    targetRtp: number;
    lastAnalyzed: string;
}

export function defaultMultipliersConfig(): MultiplierConfig {
    return {
        YAHTZEE: 3,
        FOUR_PLUS_TWO: 2,
        THREE_PAIRS: 4,
        PAIR: 1,
        OTHER: 0
    };
}

let MULTIPLIERS: MultiplierConfig = defaultMultipliersConfig()

const CONFIG_PATH = path.resolve(process.cwd(), '../game-config.json');

// Function to load multipliers from config file
export async function loadMultipliers(): Promise<MultiplierConfig> {
    try {
        const configData = await fs.readFile(CONFIG_PATH, 'utf-8');
        const config: GameConfig = JSON.parse(configData);
        console.log('Loaded multipliers from config:', config.multipliers);
        return config.multipliers;
    } catch (error) {
        console.warn('Failed to load multipliers from config, using defaults', error);
        return MULTIPLIERS;
    }
}

// Function to save multipliers to config file
export async function saveMultipliers(multipliers: MultiplierConfig): Promise<void> {
    try {
        const config: GameConfig = {
            multipliers,
            targetRtp: 95,
            lastAnalyzed: new Date().toISOString()
        };
        await fs.mkdir(path.dirname(CONFIG_PATH), { recursive: true });
        await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
        console.log('Saved multipliers to config:', multipliers);
    } catch (error) {
        console.error('Failed to save multipliers to config', error);
    }
}

export async function initializeMultipliers(): Promise<void> {
    try {
        try {
            await fs.access(CONFIG_PATH);
            MULTIPLIERS = await loadMultipliers();
        } catch (error) {
            MULTIPLIERS = optimizeMultipliers();
            await saveMultipliers(MULTIPLIERS);
        }
    } catch (error) {
        console.error('Failed to initialize multipliers:', error);
    }
}

export function rollDice(): number[] {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1);
}

export function getMultipliers(): MultiplierConfig {
    return { ...MULTIPLIERS };
}

/**
 * Checks the combination of dice and returns the name and multiplier
 * @param dice Array of dice values
 * @returns The result of the combination with the name and multiplier
 */
export function checkCombination(dice: number[]): CombinationResult {
    // Yahtzee - all 6 dice show the same value
    if (dice[0] === 6) {
        return { name: 'Yahtzee', multiplier: MULTIPLIERS.YAHTZEE };
    }

    // 4+2 - 4 cubes of one value and 2 of another
    if (dice.length === 2 && dice[0] === 4 && dice[1] === 2) {
        return { name: '4+2', multiplier: MULTIPLIERS.FOUR_PLUS_TWO };
    }

    // three pairs of identical values
    if (dice.length === 3 && dice[0] === 2 && dice[1] === 2 && dice[2] === 2) {
        return { name: 'Three Pairs', multiplier: MULTIPLIERS.THREE_PAIRS };
    }

    // Pair - at least one pair
    if (dice[0] >= 2) {
        return { name: 'Pair', multiplier: MULTIPLIERS.PAIR };
    }

    // No winning combination
    return { name: 'Other', multiplier: MULTIPLIERS.OTHER };
}