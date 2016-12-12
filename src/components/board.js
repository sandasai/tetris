import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cell from './cell';
import _ from 'lodash';
import './board.css';
import Settings from '../constants/settings';
import GameStates from '../constants/gamestates';

class Board extends Component {
  renderCells() {
    const grid = this.props.game.board;
    const { cells, color } = this.props.game.block;
    const { blockProjection } = this.props.game
    return _.flatten(_.times(grid.length, (r) => {
      return _.times(grid[r].length, (c) => {
        let cellColor = grid[r][c];
        for (let cell of blockProjection.cells) {
          if (cell.r === r && cell.c === c)
            cellColor = Settings.blockProjectionColor;
        }
        for (let cell of cells) {
          if (cell.r === r && cell.c === c)
            cellColor = color;
        }
        return (
          <Cell r={r} c={c} backgroundColor={cellColor} key={r + ' ' + c}/>
        )
      })
    }));
  }
  overlayStyles = () => {
    const { cellSize, height, width } = Settings;
    return {
      height: (cellSize * height).toString() + 'px',
      width: (cellSize * width).toString() + 'px',
      borderStyle: 'solid',
      borderWidth: '0.1px',
      backgroundColor: 'black',
      opacity: '1.0'
    }
  }
  renderBoardOverlay() {
    const { gameState } = this.props.game;
    switch (gameState) {
      case GameStates.gameover:
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div className="board">
        <div className="overlay" style={this.overlayStyles()}>{this.renderBoardOverlay()}</div>
        <div className="cells">{this.renderCells()}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { game: state.game };
}

export default connect(mapStateToProps)(Board);
