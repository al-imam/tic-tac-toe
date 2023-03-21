import Cell from "./Cell";
import { useReducer } from "react";

interface AppState {
  grid: any[];
  current: null | string;
  win: null | string;
}

const init: AppState = {
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

interface AppAction {
  type: "add" | "reset";
  index: number;
}

function reducer(prev: AppState, { index, type }: AppAction) {
  const { grid, current, win } = prev;

  switch (type) {
    case "add":
      if (win !== null) {
        return prev;
      }

      if (grid.every((n) => n !== null)) {
        return { ...prev, current: null, win: "draw" };
      }

      const updatedGrid = grid.map((n, i) => (i === index ? current : n));

      if (findWinner(updatedGrid)) {
        return {
          grid: updatedGrid,
          current: null,
          win: current,
        };
      }

      return {
        grid: updatedGrid,
        current: current === "x" ? "circle" : "x",
        win,
      };

    default:
      return prev;
  }
}

function App() {
  const [{ grid, current, win }, dispatch] = useReducer(reducer, init);

  return (
    <main className="flex justify-center items-center h-screen">
      {win === null || <div>lol</div>}
      <div className={`grid grid-cols-3 grid-rows-3 grid-layout ${current}`}>
        {grid.map((node, i) => (
          <Cell
            classes={node}
            onTap={() => dispatch({ index: i, type: "add" })}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
