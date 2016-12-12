import React, { Component } from 'react';
import BlockCollection from './block-collection';
import BlockEditorForm from './blockeditor-form';
import Board from './board';
import ScoreBoard from './scoreboard';
class Tetris extends Component {
  render() {
    return (
      <div className="container">
        <BlockCollection />
        <BlockEditorForm />
        <ScoreBoard />
        <Board />
      </div>
    );
  }
}

export default Tetris;
