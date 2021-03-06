import React from 'react';

const styles = {
  display: 'inline-block',
  width: '15px',
  height: '15px'
}

const Xclose = (props) => {
  const handleClick = (e) => {
    if (props.onClick)
      props.onClick(e);
  }
  return (
    <div onClick={handleClick} style={styles}>
      <a>X</a>
    </div>
  )
}

export default Xclose;
