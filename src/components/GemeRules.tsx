export const getNextGeneration = (grid: number[][]): number[][] => {
    const rows = grid.length;
    const cols = grid[0].length;

    const newGrid = grid.map(row => [...row]);

    const operations = [
        [0, 1], [0, -1], [1, -1], [-1, 1],
        [1, 1], [-1, -1], [1, 0], [-1, 0]
    ];

    for (let i = 0; i < rows; i++) {
        for (let k = 0; k < cols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
                const newI = i + x;
                const newK = k + y;
                if (newI >= 0 && newI < rows && newK >= 0 && newK < cols) {
                    neighbors += grid[newI][newK];
                }
            });

            if (neighbors < 2 || neighbors > 3) {
                newGrid[i][k] = 0;
            } else if (grid[i][k] === 0 && neighbors === 3) {
                newGrid[i][k] = 1;
            }
        }
    }
    return newGrid;
};