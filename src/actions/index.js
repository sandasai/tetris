import * as ds from '../constants/data_structures';

export const TICK = 'TICK';
export const ROTATE = 'ROTATE';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_DOWN = 'MOVE_DOWN';
export const DROP = 'DROP';
export const PAUSE = 'PAUSE';
export const RESTART = 'RESTART';

//Game specific
export function tick() {
  return {
    type: TICK
  }
}

export function rotate() {
  return {
    type: ROTATE
  }
}

export function move(dir) {
  return {
    type: dir
  }
}

export function drop() {
  return  {
    type: DROP
  }
}

export function pause() {
  return {
    type: PAUSE
  }
}

export function restart() {
  return {
    type: RESTART
  }
}

export const EDITOR = {
  SELECT_BLOCK_FROM_COLLECTION: 'SELECT_BLOCK_FROM_COLLECTION',
  CREATE_BLOCK: 'EDITOR_CREATE_BLOCK',
  CREATE_ROTATION: 'EDITOR_CREATE_ROTATION',
  CHANGE_NAME: 'EDITOR_CHANGE_NAME',
  CHANGE_DIM: 'EDITOR_CHANGE_DIM',
  CHANGE_DIM_HEIGHT: 'EDITOR_CHANGE_DIM_HEIGHT',
  CHANGE_DIM_WIDTH: 'EDITOR_CHANGE_DIM_WIDTH',
  CHANGE_COLOR: 'EDITOR_CHANGE_COLOR',
  TOGGLE_CELL_IN_ROTATION: 'EDITOR_TOGGLE_CELL_IN_ROTATION'
}

export function selectBlockFromCollection(blockType) {
  return {
    type: EDITOR.SELECT_BLOCK_FROM_COLLECTION,
    payload: blockType
  }
}

export function editorCreateBlock() {
  let newBlockType = new ds.BlockType('name', 'red', [ new ds.Rotation(3, 3, [new ds.Cell(0, 0)]) ]);
  return {
    type: EDITOR.CREATE_BLOCK,
    payload: newBlockType
  }
}

export function editorChangeName(name) {
  return  {
    type: EDITOR.CHANGE_NAME,
    payload: name
  }
}

export function editorChangeDimHeight(value) {
  return {
    type: EDITOR.CHANGE_DIM_HEIGHT,
    payload: value
  }
}

export function editorChangeDimWidth(value) {
  return {
    type: EDITOR.CHANGE_DIM_WIDTH,
    payload: value
  }
}

export function editorChangeColor(hex) {
  return {
    type: EDITOR.CHANGE_COLOR,
    payload: hex
  }
}

export function editorCreateRotation(rotation) {
  return {
    type: EDITOR.CREATE_ROTATION
  }
}

export function editorToggleCellInRotation(selectedRotationIndex, r, c) {
  return {
    type: EDITOR.TOGGLE_CELL_IN_ROTATION,
    payload: {
      selectedRotationIndex,
      r,
      c
    }
  }
}
