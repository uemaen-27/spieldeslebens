interface CellProps {
    alive: boolean;
    toggle: () => void;
}

export const Cell = ({ alive, toggle }: CellProps) => (
    <div
        onClick={toggle}
        style={{
            width: 20,
            height: 20,
            backgroundColor: alive ? '#2ecc71' : '#2c3e50',
            border: '1px solid #34495e',
            cursor: 'pointer'
        }}
    />
);