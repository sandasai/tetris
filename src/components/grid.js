import React from 'react';
import Cell from './cell';
import _ from 'lodash';

const styleGrid = {
  display: 'block',
  position: 'relative',
  margin: '5px'
}

/* acceptable props
  width (reqired) - how many cells are contained in the width?
  height (required) - how many cells are contained in the height?
  cellSize - cell size (numeric)
  filled - the cells that should be filled. { r: row, c:col, color: filledColor}
  defaultColor - the color of cells that are not filled
  cellBorderStyle - border style of the cells
  cellBorderWidth - border width of the cells
*/
const Grid = (props) => {
  const { width, height, cellSize=16, filled=[], color='' } = props;
  const gridWidth = width * cellSize + 5;
  const gridHeight = height * cellSize + 5;
  const renderCells = () => {
    return _.times(height, (r) => {
      return _.times(width, (c) => {
        const cellStyles = {
          r,
          c,
          borderTopStyle: 'dotted',
          borderLeftStyle: 'dotted',
          borderBottomStyle: 'none',
          borderRightStyle: 'none',
          borderWidth: '1px',
        }
        if (r === height - 1) {
          cellStyles.borderBottomStyle = 'dotted';
        }
        if (c === width - 1) {
          cellStyles.borderRightStyle = 'dotted';
        }
        let color = '';
        for (let cell of filled) {
          if (cell.r === r && cell.c ===c) {
            cellStyles.backgroundColor = cell.color;
          }
        }
        return (
          <Cell {...cellStyles} key={r + ' ' + c}/>
        )
      })
    })
  }
  const handleClick = (e) => {
    if (props.onClick) {
      props.onClick(e);
    }
  }
  return (
    <div onClick={handleClick} style={{...styleGrid, width: gridWidth, height: gridHeight}}>
      {renderCells()}
    </div>
  )
}

export default Grid;
