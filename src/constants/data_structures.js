import _ from 'lodash';

export class Cell {
  constructor(r, c) {
    this.r = r;
    this.c = c;
  }
}
export class Grid {
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
export class BlockType {
  constructor(name, color, unitRotations) {
    this.name = name;
    this.color = color;
    this.unitRotations = unitRotations;
  }
}
