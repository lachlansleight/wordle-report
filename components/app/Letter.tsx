
const Letter = ({letter, state = "neutral"}: {letter: string, state: "neutral" | "partial" | "correct"}): JSX.Element => {
    return (
        <div className={`grid place-items-center rounded w-16 py-2 ${state === "neutral" ? "bg-neutral-700" : state === "partial" ? "bg-yellow-600" : "bg-green-700"}`}>
            <p className="text-white text-3xl uppercase">{letter}</p>
        </div>
    )
}

export default Letter;