import React from "react";

const buttons = (
  generation,
  running,
  runSimulation,
  runningRef,
  numRows,
  numCols,
  setGrid,
  randomGrid,
  setRunning,
  emptyGrid
) => {
  return (
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
  );
};

export default buttons;
