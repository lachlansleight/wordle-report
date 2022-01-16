import { useCallback, useState } from "react";
import GameReport from "components/app/WordList";
import Layout from "../components/layout/Layout";

export const Home = (): JSX.Element => {

    const [target, setTarget] = useState("");
    const [guesses, setGuesses] = useState("");
    const [ready, setReady] = useState(false);

    const isValid = useCallback(() => {
        if(target.length !== 5) return false;
        const guessArray = guesses.split("\n");
        if(guessArray.length === 0) return false;
        for(let i = 0; i < guessArray.length; i++) {
            console.log(guessArray[i]);
            if(guessArray[i].length !== 5) return false;
        }
        return true;
    }, [target, guesses])

    return (
        <Layout>
            {ready ? (
                <div className="flex flex-col gap-4">
                    <button className={`text-xl py-2 rounded bg-green-700 cursor-pointer`} onClick={() => setReady(false)}>Go Back</button>
                    <GameReport words={guesses.split("\n").map(w => w.toLowerCase())} target={target} />
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl mb-4">Input your game data</h1>
                    <label>Target Word</label>
                    <input className="bg-neutral-800 text-white rounded px-2 py-1" type="text" value={target} onChange={e => setTarget(e.target.value.toLowerCase())} />
                    <label>Guesses</label>
                    <textarea className="bg-neutral-800 text-white rounded px-2 py-1 h-36" value={guesses} onChange={e => setGuesses(e.target.value.toLowerCase())} />
                    <button className={`text-xl py-2 rounded ${!isValid() ? "bg-red-700" : "bg-green-700 cursor-pointer"}`} disabled={!isValid()} onClick={() => setReady(true)}>Show Report</button>
                </div>
            )}
        </Layout>
    );
};

export default Home;
