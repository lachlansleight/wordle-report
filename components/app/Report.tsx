import { useState } from "react"
import { getValidWordsAfterGuess } from "lib/wordList";
import Word from "./Word";

const Report = ({guess, target, validWords}: {guess: string, target: string, validWords: string[]}): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col">
            <div className="flex gap-4 items-center">
                <Word value={guess} target={target} />
                <p className="text-2xl">Valid Words: {validWords.length}</p>
                <button className="bg-neutral-700 rounded w-12 h-12 text-4xl cursor-pointer" onClick={() => setIsOpen(cur => !cur)}>{isOpen ? "-" : "+"}</button>
            </div>
            {isOpen && (
                <ul className="pl-4">
                    {validWords.map(word => {
                        const validCount = getValidWordsAfterGuess(word, target).length;
                        return {
                            word,
                            validCount
                        }
                    }).sort((a, b) => a.validCount - b.validCount)
                    .map(word => {
                        return (
                            <div key={word.word} className="flex gap-4 items-center">
                                <Word value={word.word} target={target} />
                                <p className="text-2xl">Valid Words: {word.validCount}</p>
                            </div>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default Report;