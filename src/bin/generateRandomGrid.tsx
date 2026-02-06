export const generateRandomGrid = (rows: number, cols: number): number[][] => {
  const newGrid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let k = 0; k < cols; k++) {
      row.push(Math.random() > 0.7 ? 1 : 0);
    }
    newGrid.push(row);
  }
  return newGrid;
};