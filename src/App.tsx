import Cell from "./Cell";
import { useReducer } from "react";

const init = {
  grid: Array(9).fill(null),
} as const;

function reducer(prev: typeof init, next: typeof init) {
  return { ...prev, ...next };
}

function App() {
  const [{ grid }, dispatch] = useReducer(reducer, init);

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-3 grid-rows-3 grid-layout ">
        {grid.map((_, i) => (
          <Cell classes="" />
        ))}
      </div>
    </main>
  );
}

export default App;
