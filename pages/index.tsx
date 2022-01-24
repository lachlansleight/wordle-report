import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { applyCypher } from "lib/encoding";
import Layout from "../components/layout/Layout";
import { targetWords, nonTargetWords } from "../lib/wordList";

export const Home = (): JSX.Element => {
    const router = useRouter();
    const [target, setTarget] = useState("");
    const [guesses, setGuesses] = useState("");
    const [error, setError] = useState("");
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!target && !guesses) {
            setError("");
            setIsValid(false);
            return;
        }

        if (!targetWords.includes(target.trim())) {
            setError("Solution '" + target + "' isn't in the word list");
            setIsValid(false);
            return;
        }
        const guessArray = guesses
            .split("\n")
            .map(guess => guess.trim())
            .filter(guess => guess.length > 0);
        if (guessArray.length === 0) {
            setError("Need at least one guess");
            setIsValid(false);
            return;
        }
        for (let i = 0; i < guessArray.length; i++) {
            if (!targetWords.includes(guessArray[i]) && !nonTargetWords.includes(guessArray[i])) {
                setError("Word list doesn't contain '" + guessArray[i] + "'");
                setIsValid(false);
                return;
            }
        }
        setError("");
        setIsValid(true);
    }, [target, guesses]);

    return (
        <Layout>
            <div className="flex flex-col gap-4">
                <p className="text-xl">
                    Wordle Report will show you how quickly you narrowed down the puzzle&apos;s
                    possible solutions.
                </p>
                <p className="text-xl">Find out whether you played well, or got lucky!</p>
                <hr />

                <label>Today&apos;s Solution</label>
                <input
                    className="bg-neutral-800 text-white rounded px-2 py-1 text-2xl"
                    type="text"
                    value={target}
                    onChange={e => setTarget(e.target.value.toLowerCase())}
                />
                <label>Your Guesses (in order, one per line)</label>
                <textarea
                    className="bg-neutral-800 text-white rounded px-2 py-1 h-48 text-2xl"
                    value={guesses}
                    onChange={e => setGuesses(e.target.value.toLowerCase())}
                />
                <button
                    className={`text-xl py-2 rounded ${
                        isValid ? "bg-green-700 cursor-pointer" : "bg-red-700"
                    }`}
                    disabled={!isValid}
                    onClick={() =>
                        router.push(
                            `/report?target=${applyCypher(target.trim(), 10)}&guesses=${guesses
                                .split("\n")
                                .map((word, i) => applyCypher(word.trim(), (i + 1) * 17))
                                .join(",")}`
                        )
                    }
                >
                    Show Report
                </button>
                {error && <p className="text-2xl text-red-400 text-center">{error}</p>}
            </div>
        </Layout>
    );
};

export default Home;
