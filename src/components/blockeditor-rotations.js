import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { editorToggleCellInRotation, editorRemoveRotation } from '../actions';
import Grid from './grid';
import Xclose from './xclose';

class BlockEditorRotations extends Component {
  renderRotations() {
    const blockType = this.props.game.blockCollection[this.props.game.editorSelectBlock]
    const color = blockType.color;
    return blockType.unitRotations.map((rotation) => {
      const rotationIndex = blockType.unitRotations.indexOf(rotation)
      const height = rotation.grid.length;
      const width = rotation.grid[0].length;
      const filled = _.cloneDeep(rotation.cells).map((cell) => {
        cell.color = color;
        return cell;
      });
      const handleCellClick = (r, c) => {
        this.props.editorToggleCellInRotation(rotationIndex, r, c);
      }
      const handleClose = () => {
        this.props.editorRemoveRotation(rotationIndex);
      }
      return (
        <div key={rotationIndex} style={{display: 'inline-block'}}>
          <Xclose onClick={handleClose} />
          <Grid onCellClick={handleCellClick} height={height} width={width} filled={filled} />
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ editorToggleCellInRotation, editorRemoveRotation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockEditorRotations);
