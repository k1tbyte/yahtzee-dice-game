export interface RollResult {
  dice: number[];
  combination: string;
  multiplier: number;
  win: number;
  balance: number;
}

export interface Multipliers {
  [key: string]: number;
}

export interface DotPosition {
  [key: number]: string[];
}
