import { useMemo } from "react";
import { evaluateGuess } from "lib/wordList";
import Letter from "./Letter";

const Word = ({ value, target = "" }: { value: string; target: string }): JSX.Element => {

    const guessEval = useMemo(() => {
        return evaluateGuess(value, target);
    }, [value, target])

    return (
        <div className="flex justify-between gap-2 my-4 w-72">
            {value.split("").map((letter, index) => {
                return (
                    <Letter
                        key={value + "-" + index}
                        letter={letter}
                        state={guessEval[index]}
                    />
                );
            })}
        </div>
    );
};

export default Word;
