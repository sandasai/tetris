export const TICK = 'TICK';
export const ROTATE = 'ROTATE';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_DOWN = 'MOVE_DOWN';
export const DROP = 'DROP';
export const PAUSE = 'PAUSE';

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

export const EDITOR = {
  SELECT_BLOCK_FROM_COLLECTION: 'SELECT_BLOCK_FROM_COLLECTION',
  CREATE_ROTATION: 'EDITOR_CREATE_ROTATION',
  CHANGE_NAME: 'EDITOR_CHANGE_NAME',
  CHANGE_DIM: 'EDITOR_CHANGE_DIM',
  CHANGE_COLOR: 'EDITOR_CHANGE_COLOR'
}

export function selectBlockFromCollection(blockType) {
  return {
    type: EDITOR.SELECT_BLOCK_FROM_COLLECTION,
    payload: blockType
  }
}

export function editorChangeName(name) {
  return  {
    type: EDITOR.CHANGE_NAME,
    payload: name
  }
}

export function editorChangeDim(width, height) {
  return {
    type: EDITOR.CHANGE_DIM,
    payload: { width, height }
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
