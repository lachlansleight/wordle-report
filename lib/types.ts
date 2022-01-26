export interface Clues {
    correctLetters: string[];
    partialLetters: string[];
    incorrectLetters: string[];
}

export interface GameReport {
    targetWord: string;
    guesses: GameState[];
}

export interface GameState {
    guess: string;
    cluesAfter: string[][];
    validWords: string[];
    validWordsBefore: number;
    evaluationAfter: evaluation[];
    requiredAfter: string[];
}

export const buildStartingClues = (): string[][] => {
    const output: string[][] = [
        "abcdefghijklmnopqrstuvwxyz".split(""),
        "abcdefghijklmnopqrstuvwxyz".split(""),
        "abcdefghijklmnopqrstuvwxyz".split(""),
        "abcdefghijklmnopqrstuvwxyz".split(""),
        "abcdefghijklmnopqrstuvwxyz".split(""),
    ];
    return output;
};

export type evaluation = "correct" | "incorrect" | "partial";
