import _ from 'lodash';

//Cells are just objects with properties r, c ==> { r, c }
export class Cell {
  constructor(r, c) {
    this.r = r;
    this.c = c;
  }
}

//Grids are just multidimensional arrays represententing an arrangement of blocks in relative space [][]

//Rotations consist of both cells and grids, for both faster access to which areas are filled/empty
export class Rotation {
  constructor(w, h, cells = []) {
    this.cells = cells;
    this.grid = _.times(h, (r) => {
      return _.times(w, (c) => {
        for (let cell of this.cells) {
          if (r === cell.r && c === cell.c)
            return 1;
        }
        return null;
      });
    });
  }
}

// Removes/adds a colored cell on the grid and update grid.
export function rotationToggleCell(rotation, r, c) {
  let cellIndex = rotation.cells.findIndex((cell) => {
    if (cell.r === r && cell.c === c)
      return true;
    else
      return false;
  });
  if (cellIndex !== -1) {
    if (rotation.cells.length === 1)   //cannot toggle cell that is the last one
      return;
    rotation.cells.splice(cellIndex, 1);
  }
  else {
    rotation.cells.push(new Cell(r, c));
  }
  rotation.grid[r][c] = (rotation.grid[r][c] == null) ? 1 : null;
}

//If downsized, removes cells that are not contained in the new dimensions. Will make sure atleast one cell exists in 0,0
//arguments:
//  dim - either 'width' or 'height'
export function rotationResize(rotation, dim, value) {
  if (dim === 'width') {
    rotation.cells = rotation.cells.filter((cell) => {
      return cell.c < value;
    });
    let sizeDiff = value - rotation.grid[0].length; //assume rotation grid has atleast size 1
    if (sizeDiff < 0) {
      for (let row of rotation.grid) {
        _.times(Math.abs(sizeDiff), () => {
          row.pop();
        })
      }
    }
    else if (sizeDiff > 0) {
      for (let row of rotation.grid) {
        _.times(Math.abs(sizeDiff), () => {
          row.push(null);
        });
      }
    }
  }
  else if (dim === 'height') {
    rotation.cells = rotation.cells.filter((cell) => {
      return cell.r < value;
    });
    let sizeDiff = value - rotation.grid.length; //assume rotation grid has atleast size 1
    if (sizeDiff < 0) {
      _.times(Math.abs(sizeDiff), () => {
        rotation.grid.pop();
      });
    }
    else if (sizeDiff > 0) {
      _.times(Math.abs(sizeDiff), () => {
        rotation.grid.push(_.times(rotation.grid[0].length, () => { //add a null array with length of the width
          return null;
        }));
      });
    }
  }
  if (rotation.cells.length === 0) {
    rotation.cells.push(new Cell(0, 0)); //always ensure there's 1 cell
  }
}

//Create a new rotation and add it to an array of
export function addRotationToRotations(rotations) {
  if (rotations.length === 0)
    return;
  let height = rotations[0].grid.length; //assumes that all rotations have same dimensions
  let width = rotations[0].grid[0].length;
  let cell = new Cell(0, 0);
  rotations.push(new Rotation(width, height, [cell]));
}

export class BlockType {
  constructor(name, color, unitRotations) {
    this.name = name;
    this.color = color;
    this.unitRotations = unitRotations; //unitRotations are just an array of grids
  }
}
