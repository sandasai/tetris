import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { selectBlockFromCollection } from '../actions';

import Grid from './grid';

const stylesBlockCollection = {
  display: 'inline-block'
}

class BlockCollection extends Component {
  renderCollection() {
    const { blockCollection } = this.props.game;
    return blockCollection.map((blockType) => {
      const rotationZero = blockType.unitRotations[0];
      const color = blockType.color;
      const filled = _.cloneDeep(rotationZero.cells).map((cell) => {
        cell.color = color;
        return cell;
      });
      const handleGridClick = (e) => {
        this.props.selectBlockFromCollection(blockType);
      }
      return (
        <div style={stylesBlockCollection} key={blockCollection.indexOf(blockType)}>
          <Grid onClick={handleGridClick} width={rotationZero.grid.length} height={rotationZero.grid[0].length} filled={filled}/>
        </div>
      )
    })
  }
  render() {
    return (
      <div>{this.renderCollection()}</div>
    )
  }
}

const mapStateToProps = (state) => {
  const { editor, game } = state;
  return {
    editor,
    game
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectBlockFromCollection }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockCollection);
