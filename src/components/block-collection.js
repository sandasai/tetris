import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { selectBlockFromCollection, editorCreateBlock } from '../actions';

import Grid from './grid';
import Xclose from './xclose';

const stylesBlockCollection = {
  display: 'inline-block',
  padding: '10px'
}

class BlockCollection extends Component {
  handleAddBlock = () => {
    this.props.editorCreateBlock();
  }
  renderCollection() {
    const { blockCollection } = this.props.game;
    return blockCollection.map((blockType) => {
      const rotationZero = blockType.unitRotations[0];
      const color = blockType.color;
      const height = rotationZero.grid.length;
      const width = rotationZero.grid[0].length;
      const filled = _.cloneDeep(rotationZero.cells).map((cell) => {
        cell.color = color;
        return cell;
      });
      const handleGridClick = (e) => {
        this.props.selectBlockFromCollection(blockType);
      }
      return (
        <div style={stylesBlockCollection} key={blockCollection.indexOf(blockType)}>
          <Grid onClick={handleGridClick} width={width} height={height} filled={filled}/>
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        <div>
          <h5>Block Collection</h5>
          <p>Click on a block to edit it, or create a new one.</p>
          {this.renderCollection()}
        </div>
        <div>
          <button className="button-primary" onClick={this.handleAddBlock}>Add Block</button>
        </div>
      </div>
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
  return bindActionCreators({ selectBlockFromCollection, editorCreateBlock }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockCollection);
