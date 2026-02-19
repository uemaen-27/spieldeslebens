import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Cell } from './Cell';
import { Controls } from './Controls';
import { getNextGeneration } from './GemeRules';
import { generateRandomGrid } from '../bin/generateRandomGrid';

const numRows = 80;
const numCols = 200;

export const GameGrid = () => {
    const [grid, setGrid] = useState(() => Array(numRows).fill(0).map(() => Array(numCols).fill(0)));
    const [running, setRunning] = useState(false);
    const [speed, setSpeed] = useState(500);
    const [generation, setGeneration] = useState(0);

    const runningRef = useRef(running);
    runningRef.current = running;

    const runSimulation = useCallback(() => {
        if (!runningRef.current) return;
        setGrid((currentGrid) => getNextGeneration(currentGrid));
        setGeneration(g => g + 1);
        setTimeout(runSimulation, speed);
    }, [speed]);

    const randomize = () => {
        setGrid(generateRandomGrid(numRows, numCols));
        setGeneration(0);
    };

    useEffect(() => {
        if (running) runSimulation();
    }, [running, runSimulation]);

    return (
        <div style={{ padding: '10px' }}>
            <h2>Conway's Game of Life</h2>
            <p>Klicke auf die Quadrate, um Leben zu erschaffen, und starte die Simulation.</p>
            <Controls
                running={running}
                setRunning={setRunning}
                speed={speed}
                setSpeed={setSpeed}
                generation={generation}
                onClear={() => {
                    setGrid(Array(numRows).fill(0).map(() => Array(numCols).fill(0)));
                    setGeneration(0);
                }}
                onRandom={randomize}
            />
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${numCols}, 10px)`
            }}>
                {grid.map((rows, i) =>
                    rows.map((col: any, k) => (
                        <Cell
                            key={`${i}-${k}`}
                            alive={grid[i][k] === 1}
                            toggle={() => {
                                const newGrid = [...grid];
                                newGrid[i][k] = grid[i][k] ? 0 : 1;
                                setGrid(newGrid);
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    );
};