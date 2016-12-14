import _ from 'lodash';
import Settings from '../constants/settings';
import { arrayStandardBlock } from '../constants/standard_blocks'; //should be from reducer
import * as actions from '../actions';
import { setTimer } from '../index';
import GameStates from '../constants/gamestates';
import { rotationResize, rotationToggleCell, addRotationToRotations } from '../constants/data_structures';

const EditorActionValues = _.map((actions.EDITOR), (val) => { return val });

//Initialize the game
const initGame = (state) => {
  const level = 0;
  const totalRowsCleared = 0;
  const rowsCleared = 0;
  const rowsToLvl = Settings.rowsToLvl;
  const baseTimeInterval = Settings.baseTimeInterval;
  const board = _.times(Settings.height, (r) => {
    return _.times(Settings.width, (c) => {
      return null;
    })
  });
  const gameState = GameStates.play;
  const blockCollection = _.cloneDeep(arrayStandardBlock); //should be state.blockCollection or something like that
  const block = spawnBlock(blockCollection);
  const blockProjection = { cells: [] };
  return {
    board,
    block,
    level,
    rowsCleared,
    rowsToLvl,
    totalRowsCleared,
    baseTimeInterval,
    blockProjection,
    blockCollection,
    editorSelectBlock: 0, //refers to an index of blockCollection
    gameState
  };
}

//Returns the cell that is the top then left most of the cells listed. Helper for rotations
const findTopLeft = (cells) => {
  let topRow = Math.min(...(cells.map((cell) => { //Math.min to find the lowest index row === top row geographically
    return cell.r;
  })));
  let topCells = cells.filter((cell) => {
    if (cell.r === topRow) {
      return true;
    }
    return false;
  });
  let leftCol = Math.min(...(topCells.map((cell) => {
    return cell.c;
  })));
  return topCells.find((cell) => {
    if (cell.r === topRow && cell.c === leftCol)
      return true;
    return false;
  });
}

//Returns a random block with coordinates at the top of the board
function spawnBlock(collection) {
  const { spawnRow, spawnCol } = Settings;
  const randomBlock = _.sample(collection); //reference
  const blockStartCells = [];
  let topCellRow = 1000, leftCellCol = 1000;
  let rotation = 0;
  let startOrientation = randomBlock.unitRotations[rotation].grid;
  for (let r = 0; r < startOrientation.length; r++) {
    for (let c = 0; c < startOrientation[r].length; c++) {
      if (startOrientation[r][c] === 1) {
        if (r < topCellRow)
          topCellRow = r;
        if (c < leftCellCol)
          leftCellCol = c;
        blockStartCells.push({ r, c });
      }
    }
  }
  for (let cell of blockStartCells) {
    cell.r += (spawnRow - topCellRow);
    cell.c += (spawnCol - leftCellCol);
  }
  return {
    name: randomBlock.name, //copied by value b/c javascript. string - primitive type
    cells: blockStartCells,
    color: randomBlock.color, //copied by value b/c javascript
    rotation,
    unitRotations: randomBlock.unitRotations //reference because js object
  }
}

//Givens a set of cells, translates them with the given vector { r: row, c:: col }
//Returns the translated cells
function translate(cells, vec) {
  for (let cell of cells) {
    cell.r += vec.r;
    cell.c += vec.c;
  }
  return cells;
}

//Checks whether the cell is within the boards dimensions. Returns true if it will be OOB
function checkOutOfBounds(state, cell) {
  if (cell.r >= state.board.length ||
      cell.r < 0 ||
      cell.c >= state.board[0].length ||
      cell.c < 0) {
    return true;
  }
  return false;
}

//Given the state of the board and a set of cells, returns true if the cells are
//currently colliding with filled spaces on the board
function checkCollision(state, cells) {
  for (let cell of cells) {
    if (checkOutOfBounds(state, cell) || state.board[cell.r][cell.c]) {
      return true;
    }
  }
  return false;
}

//Returns a new cells which is the projected shape of a rotation for the current block
function rotationShape(state) {
  const { rotation, unitRotations, cells } = state.block;
  const nextIndex = nextRotationIndex(rotation, unitRotations);
  const unitTopLeft = findTopLeft(unitRotations[rotation].cells);
  const currTopLeft = findTopLeft(cells);
  const translate = { r: unitTopLeft.r - currTopLeft.r, c: unitTopLeft.c - currTopLeft.c};
  let nextCells = _.cloneDeep(unitRotations[nextIndex].cells);
  nextCells.forEach((cell) => {
    cell.r -= translate.r;
    cell.c -= translate.c;
  });
  return nextCells;
}

//Returns the next rotation index of the unit Rotations
function nextRotationIndex(rotation, unitRotations) {
  return rotation + 1 < unitRotations.length ? (rotation + 1) : 0;
}

//Gets the projection of the current block if it kept falling until collision
//Currently requires that the block has cells otherwise infinite loop;
function getProjectionHelper(state, block) {
  if (!checkCollision(state, block.cells)) {
    translate(block.cells, { r: 1, c: 0 });
    return getProjectionHelper(state, block);
  }
  translate(block.cells, { r: -1, c:0 });
  return block;
}
function getProjection(state) {
  let blockProjection = _.cloneDeep(state.block);
  state.blockProjection = getProjectionHelper(state, blockProjection);
}

//Handle TICK actions - block that steadily moves down board
function handleTick(state) {
  let newState = _.clone(state);
  let { board, block, rowsToLvl } = newState;
  let projBlockCells = translate(_.cloneDeep(block.cells), { r: 1, c: 0 });
  if (!checkCollision(state, projBlockCells)) { //check collision
    block.cells = projBlockCells;
  }
  else { //add the block to the grid;
    for (let cell of block.cells) {
      board[cell.r][cell.c] = block.color;
    }
    let newBlock = spawnBlock(newState.blockCollection); //if there is a collision on instatiating, gameover
    if (checkCollision(newState, newBlock.cells)) {
      newBlock.cells = newBlock.cells.filter((cell) => {
        if (cell.r < 0)
          return false;
        return true;
      })
      newState.gameState = GameStates.gameover;
      return newState;
    }
    newState.block = newBlock;
  }
  //Remove any rows that are filled
  _.times(board.length, (r) => {
    let filled = true;
    _.times(board[r].length, (c) => {
      if (board[r][c] == null) {
        filled = false;
      }
    });
    if (filled) {
      board.splice(r, 1);
      board.unshift(_.times(board[0].length, () => {
        return null;
      }));
      newState.rowsCleared++;
      newState.totalRowsCleared++;
    }
  });
  //level up
  if (newState.rowsCleared >= rowsToLvl) {
    newState.rowsCleared = 0;
    setTimer(newState.baseTimeInterval * Math.pow(Settings.levelUpTimeConst, newState.level++));
  }
  getProjection(newState);
  return newState;
}

//Handle resulting user input for moving blocks
function handleMove(state, vec) {
  let newState = _.clone(state);
  let projBlockCells = translate(_.cloneDeep(newState.block.cells), { r: vec.r, c: vec.c });
  if (!checkCollision(state, projBlockCells)) {
    newState.block.cells = projBlockCells;
  }
  getProjection(newState);
  return newState;
}

//Handle block rotation
function handleRotate(state) {
  let newState = _.clone(state);
  const { rotation, unitRotations } = newState.block;
  const rotationCells = rotationShape(newState);
  if (!checkCollision(newState, rotationCells)) {
    newState.block.cells = rotationCells;
    newState.block.rotation = nextRotationIndex(rotation, unitRotations);
  }
  getProjection(newState);
  return newState;
}

//Handle when player drops the block
function handleDrop(state) {
  let newState = _.clone(state);
  newState.block = newState.blockProjection;
  return handleTick(newState);
}

//Handle pauses when the player presses the pause button
function handlePause(state) {
  let newState = _.clone(state);
  const { play, pause } = GameStates;
  newState.gameState = (newState.gameState === play) ? pause : play;
  return newState;
}

//Should just be refactored possible into another file
function handleEditorForm(state, action) {
  let newState = _.clone(state);
  const { editorSelectBlock, blockCollection } = newState;
  switch (action.type) {
    case actions.EDITOR.SELECT_BLOCK_FROM_COLLECTION:
      newState.editorSelectBlock = blockCollection.indexOf(action.payload);
      break;
    case actions.EDITOR.CHANGE_NAME:
      blockCollection[editorSelectBlock].name = action.payload;
      break;
    case actions.EDITOR.CHANGE_COLOR:
      blockCollection[editorSelectBlock].color = action.payload;
      break;
    case actions.EDITOR.TOGGLE_CELL_IN_ROTATION:
      let { selectedRotationIndex, r, c} = action.payload;
      let selectedRotation = blockCollection[editorSelectBlock].unitRotations[selectedRotationIndex];
      rotationToggleCell(selectedRotation, r, c);
      break;
    case actions.EDITOR.CHANGE_DIM_WIDTH:
      for (let rotation of blockCollection[editorSelectBlock].unitRotations) {
        rotationResize(rotation, 'width', action.payload);
      }
      break;
    case actions.EDITOR.CHANGE_DIM_HEIGHT:
      for (let rotation of blockCollection[editorSelectBlock].unitRotations) {
        rotationResize(rotation, 'height', action.payload);
      }
      break;
    case actions.EDITOR.CREATE_ROTATION:
      addRotationToRotations(blockCollection[editorSelectBlock].unitRotations);
      break;
    case actions.EDITOR.CREATE_BLOCK:
      blockCollection.push(action.payload);
      break;
    case actions.EDITOR.REMOVE_BLOCK:
      blockCollection.splice(action.payload, 1);
      break;
    case actions.EDITOR.REMOVE_ROTATION:
      blockCollection[editorSelectBlock].unitRotations.splice(action.payload, 1);
      break;
    default: break;
  }
  return newState;
}

export default function game(state = initGame(), action)  {
  if (EditorActionValues.indexOf(action.type) !== -1)
    return handleEditorForm(state, action);

  if (state.gameState === GameStates.pause && action.type === actions.PAUSE) {
    return handlePause(state);
  }
  switch(state.gameState) {
    case GameStates.play:
      switch (action.type) {
        case actions.TICK:
          return handleTick(state);
        case actions.MOVE_LEFT:
          return handleMove(state, { r: 0 , c: -1 });
        case actions.MOVE_RIGHT:
          return handleMove(state, { r: 0 , c: 1 });
        case actions.MOVE_DOWN:
          return handleMove(state, { r: 1 , c: 0 });
        case actions.ROTATE:
          return handleRotate(state);
        case actions.DROP:
          return handleDrop(state);
        case actions.PAUSE:
          return handlePause(state);
        case actions.RESTART:
          return initGame();
        default:
          break;
      }
    break;
    default:
      break;
  }
  return state;
}
