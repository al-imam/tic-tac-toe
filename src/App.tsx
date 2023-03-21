import Cell from "./Cell";
import { useReducer } from "react";

const init = {
  grid: Array(9).fill(null),
  current: "x",
};

function reducer(prev: typeof init, next: Partial<typeof init>) {
  return { ...prev, ...next };
}

function App() {
  const [{ grid, current }, dispatch] = useReducer(reducer, init);

  return (
    <main className="flex justify-center items-center h-screen">
      <div className={`grid grid-cols-3 grid-rows-3 grid-layout ${current}`}>
        {grid.map((node, i) => (
          <Cell
            classes={node}
            onTap={() =>
              dispatch({
                grid: grid.map((n, j) => (j === i ? current : n)),
                current: current === "x" ? "circle" : "x",
              })
            }
          />
        ))}
      </div>
    </main>
  );
}

export default App;
