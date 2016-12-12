import React from 'react';
/*
props -
  r, c
*/
const Cell = (props) => {
  const { r, c, cellSize=16 } = props;
  const style = {
    ...props,
    top: (r * cellSize).toString() + 'px',
    left: (c * cellSize).toString() + 'px',
    width: cellSize.toString() + 'px',
    height: cellSize.toString() + 'px',
    position: 'absolute',
  }
  return (
    <div style={style} >
    </div>
  )
}

export default Cell;
