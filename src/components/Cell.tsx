import React from 'react';

interface CellProps {
    alive: boolean;
    toggle: () => void;
}

const CELL_SIZE = 20;

const CellComponent = ({ alive, toggle }: CellProps) => (
    <div
        onClick={toggle}
        style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: alive ? '#2ecc71' : '#2c3e50',
            border: '1px solid #34495e',
            cursor: 'pointer'
        }}
    />
);

// Only re-render when alive state changes
export const Cell = React.memo(CellComponent, (prevProps, nextProps) => {
    return prevProps.alive === nextProps.alive;
});