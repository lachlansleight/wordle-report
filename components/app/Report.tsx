import { useState } from "react";
import { getCluesAfterGuess } from "lib/wordList";
import Word from "./Word";

const Report = ({
    guess,
    target,
    validWords,
    possibilities,
    validWordsBefore,
}: {
    guess: string;
    target: string;
    validWords: string[];
    possibilities: string[][];
    validWordsBefore: number;
}): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col w-72 mx-auto">
            <Word value={guess} target={target} />
            <div className="flex gap-4 items-center justify-between -mt-3">
                <p className="text-2xl">
                    Options: {validWordsBefore}➞{validWords.length}
                </p>
                <button
                    className="relative bg-neutral-700 rounded w-8 h-8 text-3xl cursor-pointer"
                    onClick={() => setIsOpen(cur => !cur)}
                >
                    <span className="relative -top-1">{isOpen ? "-" : "+"}</span>
                </button>
            </div>
            {isOpen && (
                <ul className="pl-4">
                    {validWords
                        .map(word => {
                            const guessResult = getCluesAfterGuess(word, target, possibilities);
                            return {
                                word,
                                validCount: guessResult.validWords.length,
                            };
                        })
                        .sort((a, b) => a.validCount - b.validCount)
                        .map(word => {
                            return (
                                <div key={word.word} className="flex flex-col">
                                    <Word value={word.word} target={target} />
                                    <p className="text-2xl -mt-4">
                                        {validWords.length}➞{word.validCount}
                                    </p>
                                </div>
                            );
                        })}
                </ul>
            )}
        </div>
    );
};

export default Report;
