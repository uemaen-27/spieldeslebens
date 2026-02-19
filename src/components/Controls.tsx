interface ControlsProps {
    running: boolean;
    setRunning: (val: boolean) => void;
    speed: number;
    setSpeed: (val: number) => void;
    generation: number;
    onClear: () => void;
    onRandom: () => void;
}

export const Controls = ({ running, setRunning, speed, setSpeed, generation, onClear, onRandom }: ControlsProps) => (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button onClick={() => setRunning(!running)}>
            {running ? 'Stopp' : 'Start'}
        </button>

        <button onClick={onRandom}>Zufall</button>
        <button onClick={onClear}>Reset</button>
        <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
            <option value={1000}>Langsam (1s)</option>
            <option value={500}>Mittel (0.5s)</option>
            <option value={100}>Schnell (0.1s)</option>
        </select>
        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
            Generation: {generation}
        </span>
    </div>
);