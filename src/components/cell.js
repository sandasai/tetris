import React from 'react';
/*
props -
  r, c
  onClick - function to execute when this cell is clicked
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
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(r, c);
    }
  }
  return (
    <div onClick={handleClick} style={style} >
    </div>
  )
}

export default Cell;
