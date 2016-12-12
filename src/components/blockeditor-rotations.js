import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Grid from './grid';

class BlockEditorRotations extends Component {
  renderRotations() {
    const blockType = this.props.game.blockCollection[this.props.game.editorSelectBlock]
    const color = blockType.color;
    return blockType.unitRotations.map((rotation) => {
      const height = rotation.grid.length;
      const width = rotation.grid[0].length;
      const filled = _.cloneDeep(rotation.cells).map((cell) => {
        cell.color = color;
        return cell;
      });
      return (
        <div key={blockType.unitRotations.indexOf(rotation)} style={{display: 'inline-block'}}>
          <Grid height={height} width={width} filled={filled} />
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        {this.renderRotations()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}

export default connect(mapStateToProps)(BlockEditorRotations);
