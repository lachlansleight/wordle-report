import { useEffect, useState } from "react";
import { targetWords, getCluesAfterGuess, evaluateGuess, getGameStateCode } from "lib/wordList";
import { buildStartingClues, GameReport, GameState } from "lib/types";
import Report from "./Report";
import CopyToClipboard from "react-copy-to-clipboard";

const GameReportDisplay = ({ words, target }: { words: string[]; target: string }): JSX.Element => {
    const [gameReport, setGameReport] = useState<GameReport>({
        targetWord: target,
        guesses: [],
    });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const gr: GameReport = {
            targetWord: target,
            guesses: [],
        };
        let possibilities = buildStartingClues();
        for (let i = 0; i < words.length; i++) {
            const guessState = getCluesAfterGuess(words[i], target, possibilities);

            const state: GameState = {
                guess: words[i],
                cluesAfter: guessState.possibilities,
                validWords: guessState.validWords,
                validWordsBefore:
                    i === 0 ? targetWords.length : gr.guesses.slice(-1)[0].validWords.length,
                evaluationAfter: evaluateGuess(words[i], target),
            };
            possibilities = guessState.possibilities;

            console.log(state);
            gr.guesses.push(state);
        }
        console.log(gr);
        setGameReport(gr);
    }, [words, target]);

    return (
        <div>
            <p className="text-center">First number = possible words before your guess</p>
            <p className="text-center">Second number = possible words after your guess</p>
            {gameReport.guesses.map(guess => {
                return (
                    <Report
                        key={guess.guess}
                        guess={guess.guess}
                        target={target}
                        validWords={guess.validWords}
                        possibilities={guess.cluesAfter}
                        validWordsBefore={guess.validWordsBefore}
                    />
                );
            })}
            <CopyToClipboard onCopy={() => setCopied(true)} text={"World Report\n\n" + gameReport.guesses.map(guess => getGameStateCode(guess, gameReport.targetWord)).join("\n")}>
                <p className="text-center mt-8 text-lg">{copied ? "Copied!" : "Copy to Clipboard"}</p>
            </CopyToClipboard>
        </div>
    );
};

export default GameReportDisplay;