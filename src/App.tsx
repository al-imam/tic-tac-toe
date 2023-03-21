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

    case "reset":
      return {
        ...init,
        current: Math.random() > 0.5 ? "x" : "circle",
      };

    default:
      throw new Error(`No action called ${action.type}!`);
  }
}

function App() {
  const [{ grid, win, current }, dispatch] = useReducer<
    (state: AppState, action: Action) => AppState
  >(reducer, init);

  return (
    <main className="flex justify-center items-center h-screen relative">
      {win === null || (
        <div className="absolute inset-0 bg-black bg-opacity-90 z-10 flex flex-col justify-center items-center">
          <span className="text-9xl text-white">
            {win === "draw" ? "Match is draw" : win}
          </span>
          <button className="text-3xl text-blue-500 hover:text-blue-700 transition">
            Restart
          </button>
        </div>
      )}
      <div className={`grid grid-cols-3 grid-rows-3 grid-layout ${current}`}>
        {grid.map((node, i) => (
          <Cell
            classes={node}
            onTap={() => dispatch({ type: "add", index: i })}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
