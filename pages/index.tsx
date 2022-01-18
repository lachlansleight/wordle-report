import { useState } from "react";
import { useRouter } from "next/router";
import { applyCypher } from "lib/encoding";
import Layout from "../components/layout/Layout";

export const Home = (): JSX.Element => {
    const router = useRouter();
    const [target, setTarget] = useState("");
    const [guesses, setGuesses] = useState("");

    const isValid = (target: string, guesses: string) => {
        if (target.length !== 5) return false;
        const guessArray = guesses.split("\n");
        if (guessArray.length === 0) return false;
        for (let i = 0; i < guessArray.length; i++) {
            if (guessArray[i].length !== 5) return false;
            if (!/[a-z][a-z][a-z][a-z][a-z]/i.test(guessArray[i])) return false;
        }
        return true;
    };

    return (
        <Layout>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl mb-4">Input your game data</h1>
                <label>Today&apos;s Solution</label>
                <input
                    className="bg-neutral-800 text-white rounded px-2 py-1"
                    type="text"
                    value={target}
                    onChange={e => setTarget(e.target.value.toLowerCase())}
                />
                <label>Your Guesses (in order, one per line)</label>
                <textarea
                    className="bg-neutral-800 text-white rounded px-2 py-1 h-36"
                    value={guesses}
                    onChange={e => setGuesses(e.target.value.toLowerCase())}
                />
                <button
                    className={`text-xl py-2 rounded ${
                        !isValid(target, guesses) ? "bg-red-700" : "bg-green-700 cursor-pointer"
                    }`}
                    disabled={!isValid(target, guesses)}
                    onClick={() =>
                        router.push(
                            `/report?target=${applyCypher(target, 10)}&guesses=${guesses
                                .split("\n")
                                .map((word, i) => applyCypher(word, (i + 1) * 17))
                                .join(",")}`
                        )
                    }
                >
                    Show Report
                </button>
            </div>
        </Layout>
    );
};

export default Home;
