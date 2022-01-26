import { useRef, useEffect, useMemo } from "react";
import { GameReport } from "lib/types";
import { getCluesAfterGuess } from "lib/guessing";

const ReportGraph = ({ report }: { report: GameReport }): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const secondOrder = useMemo(() => {
        const output = [];
        for (let i = 0; i < report.guesses.length; i++) {
            const result = report.guesses[i].validWords
                .map(word => {
                    const guessResult = getCluesAfterGuess(
                        word,
                        report.targetWord,
                        report.guesses[i].cluesAfter,
                        report.guesses[i].requiredAfter
                    );
                    return {
                        word,
                        validCount: guessResult.validWords.length,
                    };
                })
                .sort((a, b) => a.validCount - b.validCount)
                .map(r => r.validCount);
            const min = Math.min(...result);
            const max = Math.max(...result);
            const median = result[Math.floor(result.length / 2)];
            const firstQuartile = result[Math.floor(result.length / 4)];
            const thirdQuartile = result[Math.floor((result.length * 3) / 4)];
            output.push([min, firstQuartile, median, thirdQuartile, max]);
        }
        return output;
    }, [report]);

    const renderGraph = (canvas: HTMLCanvasElement): void => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const mapX = (x: number) => (x / report.guesses.length) * canvas.width;
        const mapY = (y: number) => canvas.height - (y / secondOrder[0][4]) * canvas.height;
        const drawCandlestick = (guess: number, values: number[]) => {
            ctx.beginPath();
            ctx.moveTo(mapX(guess - 0.3), mapY(values[0]));
            ctx.lineTo(mapX(guess + 0.3), mapY(values[0]));
            ctx.moveTo(mapX(guess - 0.3), mapY(values[1]));
            ctx.lineTo(mapX(guess + 0.3), mapY(values[1]));
            ctx.moveTo(mapX(guess - 0.3), mapY(values[2]));
            ctx.lineTo(mapX(guess + 0.3), mapY(values[2]));
            ctx.moveTo(mapX(guess - 0.3), mapY(values[3]));
            ctx.lineTo(mapX(guess + 0.3), mapY(values[3]));
            ctx.moveTo(mapX(guess - 0.3), mapY(values[4]));
            ctx.lineTo(mapX(guess + 0.3), mapY(values[4]));
            ctx.moveTo(mapX(guess), mapY(values[0]));
            ctx.lineTo(mapX(guess), mapY(values[4]));
            ctx.stroke();
        };

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        for (let i = 0; i < report.guesses.length; i++) {
            drawCandlestick(i, secondOrder[i]);
        }

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mapX(0), mapY(report.guesses[0].validWords.length));
        for (let i = 1; i < report.guesses.length; i++) {
            ctx.lineTo(mapX(i), mapY(report.guesses[i].validWords.length));
        }
        ctx.stroke();
    };

    useEffect(() => {
        if (!canvasRef) return;
        if (canvasRef.current == null) return;
        renderGraph(canvasRef.current);
    }, [report, canvasRef]);

    return (
        <div>
            <canvas ref={canvasRef} width={500} height={500} />
        </div>
    );
};

export default ReportGraph;
