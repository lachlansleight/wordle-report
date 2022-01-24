import { evaluation, GameState } from "./types";
import { targetWords } from "./wordList";

export const getCluesAfterGuess = (
    guess: string,
    target: string,
    possibilitiesBefore: string[][]
): {
    validWords: string[];
    possibilities: string[][];
} => {
    let validWords = [...targetWords];

    let possibilities: string[][] = JSON.parse(JSON.stringify(possibilitiesBefore));

    const guessEval = evaluateGuess(guess, target);
    const requiredLetters: string[] = [];
    guessEval.forEach((g, i) => {
        switch (g) {
            case "correct":
                possibilities[i] = [guess[i]];
                requiredLetters.push(guess[i]);
                break;
            case "partial":
                possibilities[i] = possibilities[i].filter(letter => letter !== guess[i]);
                requiredLetters.push(guess[i]);
                break;
            case "incorrect":
                possibilities = possibilities.map(point =>
                    point.length === 1 ? point : point.filter(l => l !== guess[i])
                );
                break;
        }
    });

    validWords = validWords.filter(word => {
        for (let i = 0; i < word.length; i++) {
            if (!possibilities[i].includes(word[i])) return false;
        }
        //make sure that all the letters that we know are in the word are present
        return requiredLetters.reduce<boolean>((acc, letter) => acc && word.includes(letter), true);
    });
    return { validWords, possibilities };
};

export const evaluateGuess = (guess: string, target: string): evaluation[] => {
    const output: evaluation[] = Array(guess.length).fill("incorrect");
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === target[i]) {
            output[i] = "correct";
            continue;
        }
        const letterPartial = target.includes(guess[i]);
        if (letterPartial) output[i] = "partial";
    }

    //partial fix - if they have already found all instances of a letter, it is not a partial
    for (let i = 0; i < guess.length; i++) {
        if (output[i] !== "partial") continue;
        let correctCount = 0;
        let targetCount = 0;
        for (let j = 0; j < guess.length; j++) {
            if (target[j] === guess[i]) targetCount++;
            if (output[j] !== "correct") continue;
            if (guess[j] !== guess[i]) continue;
            correctCount++;
        }
        if (correctCount === targetCount) output[i] = "incorrect";
    }
    return output;
};

export const getGameStateCode = (state: GameState, target: string): string => {
    const wordCode = state.evaluationAfter
        .map(e => {
            switch (e) {
                case "correct":
                    return "🟩";
                case "partial":
                    return "🟨";
                case "incorrect":
                    return "⬛";
            }
            return "";
        })
        .join("");
    const postCode = state.guess === target ? "✔️" : state.validWords.length;
    return wordCode + " " + postCode;
};
