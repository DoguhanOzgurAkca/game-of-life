import { useState, useCallback, useRef } from "react";
import produce from "immer";
import randomColor from "randomcolor";
import { emptyGrid } from "./grids";
import { shiftAdd, shiftRemove } from "./boxevents";

let color = "pink";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

export const useSimulation = (numRows, numCols, generation) => {
  window.addEventListener("keydown", (e) => {
    shiftAdd(e);
  });
  window.addEventListener("keyup", (e) => {
    shiftRemove(e);
  });

  const [grid, setGrid] = useState(() => {
    return emptyGrid(numRows, numCols);
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
            // let onecounter = 0;
            // gridCopy.map((array) => {
            //   if (array.includes(1)) {
            //     onecounter += 1;
            //   }
            // });
            // if (onecounter === 0) {
            //   setRunning(false);
            // }
            // works but very slow
          }
        }
      });
    });
    color = randomColor();
    setTimeout(runSimulation, 1000);
    generation += 1;
  }, [numRows, numCols]);

  return {
    grid,
    setRunning,
    runSimulation,
    running,
    runningRef,
    setGrid,
    color,
  };
};
