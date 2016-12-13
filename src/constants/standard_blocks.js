import { Cell, Rotation, BlockType } from './data_structures';

const tTurnRot0 = new Rotation(3, 3, [ new Cell(0, 1), new Cell(1, 1), new Cell(1, 0), new Cell(1, 2)]);
const tTurnRot1 = new Rotation(3, 3, [ new Cell(1, 1), new Cell(0, 1), new Cell(2, 1), new Cell(1, 2)]);
const tTurnRot2 = new Rotation(3, 3, [ new Cell(2, 1), new Cell(1, 1), new Cell(1, 0), new Cell(1, 2)]);
const tTurnRot3 = new Rotation(3, 3, [ new Cell(1, 1), new Cell(0, 1), new Cell(2, 1), new Cell(1, 0)]);
const tTurnRots = [ tTurnRot0, tTurnRot1, tTurnRot2, tTurnRot3]
const tTurn = new BlockType('tTurn', '#FFAA2B', tTurnRots);

const pipeRot0 = new Rotation(4, 4, [ new Cell(0, 1), new Cell(1, 1), new Cell(2, 1), new Cell(3, 1)]);
const pipeRot1 = new Rotation(4, 4, [ new Cell(1, 1), new Cell(1, 2), new Cell(1, 3), new Cell(1, 0)]);
const pipeRot2 = new Rotation(4, 4, [ new Cell(0, 2), new Cell(1, 2), new Cell(2, 2), new Cell(3, 2)]);
const pipeRot3 = new Rotation(4, 4, [ new Cell(2, 1), new Cell(2, 2), new Cell(2, 3), new Cell(2, 0)]);
const pipeRots = [ pipeRot0, pipeRot1, pipeRot2, pipeRot3 ];
const pipe = new BlockType('pipe', '#90E035', pipeRots);

const squareRot0 = new Rotation(2, 2, [ new Cell(1, 1), new Cell(0, 0), new Cell(1, 0), new Cell(0, 1) ]);
const square = new BlockType('square', '#EF0B0B', [ squareRot0 ]);

const rSnakeRot0 = new Rotation(3, 3, [ new Cell(0, 1), new Cell(0, 2), new Cell(1, 0), new Cell(1, 1)]);
const rSnakeRot1 = new Rotation(3, 3, [ new Cell(0, 1), new Cell(1, 1), new Cell(1, 2), new Cell(2, 2)]);
const rSnakeRot2 = new Rotation(3, 3, [ new Cell(1, 1), new Cell(1, 2), new Cell(2, 0), new Cell(2, 1)]);
const rSnakeRot3 = new Rotation(3, 3, [ new Cell(0, 0), new Cell(1, 0), new Cell(1, 1), new Cell(2, 1)]);
const rSnakeRots = [ rSnakeRot0, rSnakeRot1, rSnakeRot2, rSnakeRot3];
const rSnake = new BlockType('rSnake', '#309BF4', rSnakeRots);

const lSnakeRot0 = new Rotation(3, 3, [ new Cell(0, 0), new Cell(0, 1), new Cell(1, 1), new Cell(1, 2)]);
const lSnakeRot1 = new Rotation(3, 3, [ new Cell(0, 2), new Cell(1, 1), new Cell(1, 2), new Cell(2, 1)]);
const lSnakeRot2 = new Rotation(3, 3, [ new Cell(1, 0), new Cell(1, 1), new Cell(2, 1), new Cell(2, 2)]);
const lSnakeRot3 = new Rotation(3, 3, [ new Cell(0, 1), new Cell(1, 0), new Cell(1, 1), new Cell(2, 0)]);
const lSnakeRots = [ lSnakeRot0, lSnakeRot1, lSnakeRot2, lSnakeRot3];
const lSnake = new BlockType('lSnake', '#AF52BF', lSnakeRots);

const lGunRot0 = new Rotation(3, 3, [ new Cell(0, 2), new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)]);
const lGunRot1 = new Rotation(3, 3, [ new Cell(0, 1), new Cell(1, 1), new Cell(2, 1), new Cell(2, 2)]);
const lGunRot2 = new Rotation(3, 3, [ new Cell(1, 0), new Cell(1, 1), new Cell(1, 2), new Cell(2, 0)]);
const lGunRot3 = new Rotation(3, 3, [ new Cell(0, 0), new Cell(0, 1), new Cell(1, 1), new Cell(2, 1)]);
const lGunRots = [ lGunRot0, lGunRot1, lGunRot2, lGunRot3];
const lGun = new BlockType('lGun', '#FFED2B', lGunRots);

const rGunRot0 = new Rotation(3, 3, [ new Cell(0, 0), new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)]);
const rGunRot1 = new Rotation(3, 3, [ new Cell(0, 1), new Cell(1, 1), new Cell(2, 1), new Cell(0, 2)]);
const rGunRot2 = new Rotation(3, 3, [ new Cell(1, 0), new Cell(1, 1), new Cell(1, 2), new Cell(2, 2)]);
const rGunRot3 = new Rotation(3, 3, [ new Cell(2, 0), new Cell(0, 1), new Cell(1, 1), new Cell(2, 1)]);
const rGunRots = [ rGunRot0, rGunRot1, rGunRot2, rGunRot3];
const rGun = new BlockType('rGun', '#6E4CB2', rGunRots);

export default {
  tTurn,
  pipe,
  square,
  rSnake,
  lSnake,
  lGun,
  rGun
}

export const arrayStandardBlock = [
  tTurn,
  pipe,
  square,
  rSnake,
  lSnake,
  lGun,
  rGun
]
