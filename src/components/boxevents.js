import produce from "immer";
let mouseDown = false;
let shiftDown = false;

const boxClicker = (i, k, grid, setGrid, action) => {
  const newGrid = produce(grid, (gridCopy) => {
    gridCopy[i][k] = action;
  });
  setGrid(newGrid);
};

const boxChoosing = (i, k, grid, setGrid) => {
  if (mouseDown === true) {
    if (shiftDown === true) {
      boxClicker(i, k, grid, setGrid, 0);
    } else if (shiftDown === false) {
      boxClicker(i, k, grid, setGrid, 1);
    }
  }
};
const onMouseDown = () => {
  mouseDown = true;
};
const onMouseLeave = () => {
  mouseDown = false;
};
const shiftRemove = (e) => {
  const key = e.key;
  if (key === "Shift") {
    shiftDown = false;
  }
};
const shiftAdd = (e) => {
  const key = e.key;
  if (key === "Shift") {
    shiftDown = true;
  }
};
export {
  shiftAdd,
  shiftRemove,
  onMouseDown,
  onMouseLeave,
  boxChoosing,
  boxClicker,
};
