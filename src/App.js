import "./App.css";
import React from "react";
import { emptyGrid, randomGrid } from "./components/grids";
import { onMouseDown, onMouseLeave, boxChoosing } from "./components/boxevents";

import { useSimulation } from "./components/simulation";

const numRows = 55;
const numCols = 110;
let generation = 0;

function App() {
  const {
    grid,
    setRunning,
    runSimulation,
    running,
    runningRef,
    setGrid,
    color,
  } = useSimulation(numRows, numCols, generation);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation(numRows, numCols, generation);
            }
          }}
        >
          {running ? "stop" : "start"}
        </button>
        <button
          onClick={() => {
            setGrid(emptyGrid(numRows, numCols));
            generation = 0;
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            setGrid(randomGrid(numRows, numCols));
          }}
        >
          Random Seed
        </button>
        <button>{generation}</button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onMouseDown={() => {
                onMouseDown();
                boxChoosing(i, k, grid, setGrid);
              }}
              onMouseUp={() => {
                onMouseLeave();
              }}
              onMouseEnter={() => {
                boxChoosing(i, k, grid, setGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? color : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
