import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { restart } from '../actions';
import BlockCollection from './block-collection';
import BlockEditorForm from './blockeditor-form';
import Board from './board';
import ScoreBoard from './scoreboard';

class Tetris extends Component {
  handleRestart() {
    this.props.restart();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="four columns">
            <ScoreBoard />
            <Board />
            <button onClick={() => {this.handleRestart()}} className="button">Restart</button>
          </div>
          <div className="eight columns">
            <BlockCollection />
            <BlockEditorForm />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ restart }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tetris);
