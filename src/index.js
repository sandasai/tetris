import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import Tetris from './components/tetris';
import * as actions from './actions';
import { game, editor } from './reducers';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const reducers = combineReducers({
  game,
  editor
});
let store = createStore(reducers);

//initiates the timer
let timer = setInterval(() => {
    store.dispatch(actions.tick());
  }, 1000);
export const setTimer = (interval) => {
  clearInterval(timer);
  timer = setInterval(() => {
    store.dispatch(actions.tick());
  }, interval);
}

//initiates keyboard events
function eventHandler(e) {
  switch (e.key) {
    case 'ArrowLeft':
      store.dispatch(actions.move(actions.MOVE_LEFT));
      break;
    case 'ArrowRight':
      store.dispatch(actions.move(actions.MOVE_RIGHT));
      break;
    case 'ArrowDown':
      store.dispatch(actions.move(actions.MOVE_DOWN));
      break;
    case 'ArrowUp':
      store.dispatch(actions.rotate(actions.ROTATE));
      break;
    case ' ':
      store.dispatch(actions.drop());
      break;
    case 'p':
      store.dispatch(actions.pause());
      break;
    default:
      break;
  }
}
window.addEventListener("keydown", eventHandler, false);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Tetris}>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
  ,
  document.getElementById('root')
);
