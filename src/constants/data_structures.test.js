import { Cell, Grid, BlockType } from './data_structures';

describe('Cell', () => {
  it('should create a cell', () => {
    const testCell = new Cell(5, 1);
    expect(testCell).toEqual({ r: 5, c: 1});
  });
});

describe('Grid', () => {
  it('should create a grid', () => {
    const filledCells = [ new Cell(0, 1), new Cell(1, 1), new Cell(2, 1), new Cell(3, 1)];
    const testGrid = new Grid(4, 4, filledCells);
    for (let cell of filledCells) {
      expect(testGrid.cells).toContainEqual(cell);
    }
    expect(testGrid.grid[0]).toEqual([ null, 1, null, null ]);
    expect(testGrid.grid[1]).toEqual([ null, 1, null, null ]);
    expect(testGrid.grid[2]).toEqual([ null, 1, null, null ]);
    expect(testGrid.grid[3]).toEqual([ null, 1, null, null ]);
    expect(testGrid.grid.length).toEqual(4);
  });
});

describe('BlockType', () => {
  it('should create a blockType', () => {
    const rotation0 = new Grid(3, 3, [ new Cell(0, 1), new Cell(1, 1), new Cell(1, 0), new Cell(1, 2)]);
    const rotation1 = new Grid(3, 3, [ new Cell(1, 1), new Cell(0, 1), new Cell(2, 1), new Cell(1, 2)]);
    const rotation2 = new Grid(3, 3, [ new Cell(2, 1), new Cell(1, 1), new Cell(1, 0), new Cell(1, 2)]);
    const rotation3 = new Grid(3, 3, [ new Cell(1, 1), new Cell(0, 1), new Cell(1, 1), new Cell(2, 0)]);
    const rotations = [ rotation0, rotation1, rotation2, rotation3]
    const tTurn = new BlockType('tTurn', 'red', rotations);
    expect(tTurn.name).toEqual('tTurn');
    expect(tTurn.color).toEqual('red');
    for (let rotation of rotations) {
      expect(tTurn.unitRotations).toContainEqual(rotation);
    }
  })
})
