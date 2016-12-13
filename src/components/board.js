import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from './grid';
import _ from 'lodash';
import Settings from '../constants/settings';

const stylesBoard = {
  position: 'relative',
  display: 'inline-block',
}

class Board extends Component {
  render() {
    const grid = this.props.game.board;
    const { cells, color } = this.props.game.block;
    const cellsProj = this.props.game.blockProjection.cells;
    let filledCells = [];
    _.times(grid.length, (r) => { //fill in current grid
      _.times(grid[r].length, (c) => {
        if (grid[r][c] !== null) {
          filledCells.push({ r, c, color: grid[r][c]});
        }
      });
    });
    let uniqueProj = cellsProj.filter((projCell) => {
      for (let cell of cells) {
        if (cell.r === projCell.r && cell.c === projCell.c)
          return false;
      }
      return true;
    })
    for (let cell of cells) {
      filledCells.push({ r: cell.r, c: cell.c, color});
    }
    for (let cell of uniqueProj) {
      filledCells.push({ r: cell.r, c: cell.c, color: Settings.blockProjectionColor});
    }
    return (
      <div style={stylesBoard}>
        <Grid width={grid[0].length} height={grid.length} filled={filledCells}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { game: state.game };
}

export default connect(mapStateToProps)(Board);
