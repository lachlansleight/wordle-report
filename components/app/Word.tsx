import Letter from "./Letter";

const Word = ({ value, target = "" }: { value: string; target: string }): JSX.Element => {
    return (
        <div className="flex justify-between gap-2 my-4 w-72">
            {value.split("").map((letter, index) => {
                const isCorrect = letter === target[index];
                const isPartial = target.includes(letter) && !isCorrect;
                return (
                    <Letter
                        key={value + "-" + index}
                        letter={letter}
                        state={isCorrect ? "correct" : isPartial ? "partial" : "neutral"}
                    />
                );
            })}
        </div>
    );
};

export default Word;
