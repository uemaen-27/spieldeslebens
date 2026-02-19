import { useState, useCallback, useRef, useEffect } from 'react';
import { Cell } from './Cell';
import { Controls } from './Controls';
import { getNextGeneration } from './GemeRules';
import { generateRandomGrid } from '../bin/generateRandomGrid';

// Configuration
const CELL_SIZE = 20; // px - configurable constant

interface GridDimensions {
    rows: number;
    cols: number;
}

// Helper: Preserve cells when resizing grid
const resizeGrid = (
    oldGrid: number[][],
    newRows: number,
    newCols: number
): number[][] => {
    const newGrid = Array(newRows).fill(0).map(() => Array(newCols).fill(0));

    const minRows = Math.min(oldGrid.length, newRows);
    const minCols = oldGrid.length > 0 ? Math.min(oldGrid[0].length, newCols) : 0;

    for (let i = 0; i < minRows; i++) {
        for (let k = 0; k < minCols; k++) {
            newGrid[i][k] = oldGrid[i][k];
        }
    }

    return newGrid;
};

export const GameGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [gridDimensions, setGridDimensions] = useState<GridDimensions>({ rows: 30, cols: 30 });
    const [grid, setGrid] = useState<number[][]>([]);
    const [running, setRunning] = useState(false);
    const [speed, setSpeed] = useState(500);
    const [generation, setGeneration] = useState(0);

    const runningRef = useRef(running);
    runningRef.current = running;

    // Calculate dimensions based on container size
    const calculateDimensions = useCallback(() => {
        if (!containerRef.current) return;

        const { clientWidth, clientHeight } = containerRef.current;
        console.log(clientWidth)
        const cols = Math.floor(clientWidth / CELL_SIZE);
        const rows = Math.floor(clientHeight / CELL_SIZE);

        setGridDimensions({ rows, cols });
    }, []);

    // ResizeObserver for responsive grid
    useEffect(() => {
        calculateDimensions();

        const observer = new ResizeObserver(calculateDimensions);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [calculateDimensions]);

    // Preserve cells when dimensions change
    useEffect(() => {
        setGrid(currentGrid =>
            currentGrid.length === 0
                ? Array(gridDimensions.rows).fill(0).map(() => Array(gridDimensions.cols).fill(0))
                : resizeGrid(currentGrid, gridDimensions.rows, gridDimensions.cols)
        );
    }, [gridDimensions]);

    const runSimulation = useCallback(() => {
        if (!runningRef.current) return;
        setGrid((currentGrid) => getNextGeneration(currentGrid));
        setGeneration(g => g + 1);
        setTimeout(runSimulation, speed);
    }, [speed]);

    const randomize = useCallback(() => {
        setGrid(generateRandomGrid(gridDimensions.rows, gridDimensions.cols));
        setGeneration(0);
    }, [gridDimensions]);

    const clearGrid = useCallback(() => {
        setGrid(Array(gridDimensions.rows).fill(0).map(() => Array(gridDimensions.cols).fill(0)));
        setGeneration(0);
    }, [gridDimensions]);

    useEffect(() => {
        if (running) runSimulation();
    }, [running, runSimulation]);

    return (
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Conway's Game of Life</h2>
            <p>Klicke auf die Quadrate, um Leben zu erschaffen, und starte die Simulation.</p>
            <Controls
                running={running}
                setRunning={setRunning}
                speed={speed}
                setSpeed={setSpeed}
                generation={generation}
                onClear={clearGrid}
                onRandom={randomize}
            />
            <div
                ref={containerRef}
                style={{
                    width: '95vw',
                    height: '70vh',
                    overflow: 'hidden',
                    backgroundColor: '#1a1a1a'
                }}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridDimensions.cols}, ${CELL_SIZE}px)`,
                    gridTemplateRows: `repeat(${gridDimensions.rows}, ${CELL_SIZE}px)`
                }}>
                    {grid.map((rows, i) =>
                        rows.map((_col, k) => (
                            <Cell
                                key={`${i}-${k}`}
                                alive={grid[i][k] === 1}
                                toggle={() => {
                                    setGrid(currentGrid => {
                                        const newGrid = currentGrid.map(row => [...row]);
                                        newGrid[i][k] = newGrid[i][k] ? 0 : 1;
                                        return newGrid;
                                    });
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};