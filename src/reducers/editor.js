import { EDITOR } from '../actions/index';
import { Grid } from '../constants/data_structures';
import _ from 'lodash';

function createRotation(state) {
  let newState = _.clone(state);
  const { width, height } = newState;
  newState.rotations.push(new Grid(width, height));
  return newState;
}

export default function editor(state = { name: '', width: 4, height: 3, rotations: [] }, action) {
  switch (action.type) {
    case EDITOR.CHANGE_NAME:
      return {...state, name: action.payload}
    case EDITOR.CHANGE_DIM:
      return {...state, width: action.payload.width, height: action.payload.height }
    case EDITOR.CHANGE_COLOR:
      return {...state, color: action.payload }
    default:
      return state;
  }
}
