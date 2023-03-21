import Cell from "./Cell";
import { useReducer } from "react";

interface Init {
  grid: any[];
  current: null | string;
  win: null | string;
}

const init: Init = {
  grid: Array(9).fill(null),
  current: "x",
  win: null,
};

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

interface TapAction {
  type: "add";
  payload: { index: number; node: string };
}

interface ResetAction {
  type: "reset";
}

function reducer(
  { grid, current, win }: Init,
  { index, node }: { index: number; node: string }
) {
  const newState = {
    grid: grid.map((n, i) => (i === index ? current : n)),
    current: node !== null ? current : current === "x" ? "circle" : "x",
    win,
  };

  if (findWinner(newState.grid)) {
    return { grid: newState.grid, current: null, win: current };
  }

  if (grid.every((n) => n !== null)) return { grid, current, win };

  return newState;
}

function App() {
  const [{ grid, current, win }, dispatch] = useReducer(reducer, init);

  return (
    <main className="flex justify-center items-center h-screen">
      {win === null || <div>lol</div>}
      <div className={`grid grid-cols-3 grid-rows-3 grid-layout ${current}`}>
        {grid.map((node, i) => (
          <Cell classes={node} onTap={() => dispatch({ index: i, node })} />
        ))}
      </div>
    </main>
  );
}

export default App;
