import Cell from "./Cell";
import { useReducer } from "react";

const init = {
  grid: Array(9).fill(null),
  current: "x",
  win: null,
};

interface Init {
  grid: any[];
  current: null | string;
  win: null | string;
}

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function findWinner(g: (null | string)[]): null | string {
  for (const [a, b, c] of winningCombination) {
    if (g[a] && g[a] === g[b] && g[a] === g[c]) {
      return g[a];
    }
  }

  return null;
}

function reducer(
  { grid, current, win }: Init,
  { index, node }: { index: number; node: string }
) {
  if (grid.every((n) => n !== null)) return { grid, current, win };

  grid[index] = node === null ? current : node;

  if (findWinner(grid)) {
    return { grid, current: null, win: node };
  }

  return {
    win,
    grid,
    current: node !== null ? current : current === "x" ? "circle" : "x",
  };
}

function App() {
  const [{ grid, current }, dispatch] = useReducer(reducer, init);

  return (
    <main className="flex justify-center items-center h-screen">
      <div className={`grid grid-cols-3 grid-rows-3 grid-layout ${current}`}>
        {grid.map((node, i) => (
          <Cell classes={node} onTap={() => dispatch({ index: i, node })} />
        ))}
      </div>
    </main>
  );
}

export default App;
