import React, { Component } from 'react';
import { connect } from 'react-redux';

class ScoreBoard extends Component {
  render() {
    const { level, totalRowsCleared } = this.props.game;
    return (
      <div>
        <h6>Level: {level}</h6>
        <h6>Rows Cleared: {totalRowsCleared}</h6>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  };
}

export default connect(mapStateToProps)(ScoreBoard);
