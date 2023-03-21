import Cell from "./Cell";
import { useReducer } from "react";

const init = {
  grid: Array(9).fill(null),
  current: "x",
};

function reducer(
  { grid, current }: typeof init,
  { index, node }: { index: number; node: string }
) {
  if (grid.every((n) => n !== null)) return { grid, current };

  grid[index] = node === null ? current : node;

  return {
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
