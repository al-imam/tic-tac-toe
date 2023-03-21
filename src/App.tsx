import Cell from "./Cell";
import { useReducer } from "react";

interface AppState {
  grid: any[];
  current: null | string;
  win: null | string;
}

const init: AppState = {
  grid: Array(9).fill(null),
  current: "cross",
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
  index: number;
}

interface ResetAction {
  type: "reset";
}

type Action = TapAction | ResetAction;

function reducer(prev: AppState, action: Action) {
  const { grid, current, win } = prev;

  switch (action.type) {
    case "add":
      const { index } = action;

      if (win !== null) {
        return prev;
      }

      const updatedGrid = grid.map((n, i) => (i === index ? current : n));

      if (findWinner(updatedGrid)) {
        return {
          grid: updatedGrid,
          current: null,
          win: current,
        };
      }

      if (updatedGrid.every((n) => n !== null)) {
        return { grid: updatedGrid, current: null, win: "draw" };
      }

      return {
        grid: updatedGrid,
        current: current === "cross" ? "circle" : "cross",
        win,
      };

    case "reset":
      return {
        ...init,
        current: Math.random() > 0.5 ? "cross" : "circle",
      };

    default:
      throw new Error(`Action not recognize!`);
  }
}

function App() {
  const [{ grid, win, current }, dispatch] = useReducer<
    (state: AppState, action: Action) => AppState
  >(reducer, init);

  function callback(n: string | null, i: number) {
    if (n !== null) return;
    dispatch({ type: "add", index: i });
  }

  return (
    <main className="flex justify-center items-center h-screen relative">
      {win === null || (
        <div className="absolute inset-0 bg-black bg-opacity-90 z-10 flex flex-col gap-4 justify-center items-center">
          <span className="text-6xl text-white">
            {win === "draw" ? "match draw 🤝" : `${win} win 🎉`}
          </span>
          <button
            onClick={() => dispatch({ type: "reset" })}
            className="text-3xl text-blue-500 hover:text-blue-700 transition"
          >
            Restart
          </button>
        </div>
      )}
      <div className={`grid grid-cols-3 grid-rows-3 grid-layout ${current}`}>
        {grid.map((node, i) => (
          <Cell classes={node} onTap={() => callback(node, i)} />
        ))}
      </div>
    </main>
  );
}

export default App;
