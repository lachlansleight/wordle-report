import WordList, { getValidWordsAfterGuess } from "lib/wordList"
import Report from "./Report";
import Word from "./Word"

const GameReport = ({words, target}: {words: string[], target: string}): JSX.Element => {
    return (
        <div>
            {words.map(word => {
                return <Word key={word} value={word} target={target} />
            })}
            <h1 className="text-2xl mt-4">Report</h1>
            <p>Total word count: {WordList.length}</p>
            {words.map(word => {
                const validWords = getValidWordsAfterGuess(word, target);
                return <Report key={word} guess={word} target={target} validWords={validWords} />
            })}
        </div>
    )
}

export default GameReport;