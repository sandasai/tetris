import React, { Component } from 'react';
import _ from 'lodash';
import { CirclePicker } from 'react-color';
import { editorChangeName, editorChangeDimHeight, editorChangeDimWidth, editorChangeColor, editorCreateRotation } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlockEditorRotation from './blockeditor-rotations.js';

class BlockEditorForm extends Component {
  handleAddRotation = (e) => {
    this.props.editorCreateRotation();
  }
  handleNameChange = (e) => {
    this.props.editorChangeName(e.target.value);
  }
  handleColorChange = (e) => {
    this.props.editorChangeColor(e.hex);
  }
  renderSelectDimensions(maxLength, dim) {
    const { blockCollection, editorSelectBlock } = this.props.game;
    const sampleRotation = blockCollection[editorSelectBlock].unitRotations[0];
    const value = (dim === 'height') ? sampleRotation.grid.length : sampleRotation.grid[0].length;
    const handleDimSelectChange = (e) => {
      if (dim === 'width')
        this.props.editorChangeDimWidth(e.target.value);
      else if (dim === 'height')
        this.props.editorChangeDimHeight(e.target.value);
    }
    return (
      <select className="u-full-width"
              id={dim}
              onChange={(e) => handleDimSelectChange(e)}
              value={value}>
        {_.times(maxLength, (num) => {
          let val = num + 1
          return (
            <option key={val}>{val}</option>
          )
        })}
      </select>
    )
  }
  render() {
    let { blockCollection, editorSelectBlock } = this.props.game;
    let blockType = blockCollection[editorSelectBlock];
    let name = blockType.name;
    return (
      <div>
        <h5>Block Forms</h5>
        <div className="row">
          <div className="three columns">
            <label htmlFor="blockName">Block Name</label>
            <input className="u-full-width" id="blockName" type="text" value={name} onChange={this.handleNameChange}/>
          </div>
          <div className="two columns">
            <label htmlFor="width">Width</label>
            {this.renderSelectDimensions(5, 'width')}
          </div>
          <div className="two columns">
            <label htmlFor="height">Height</label>
            {this.renderSelectDimensions(5, 'height')}
          </div>
          <div className="five columns">
            <CirclePicker
              color={blockType.color}
              onChange={this.handleColorChange}
              />
          </div>
        </div>
        <div className="row">
          <p>Click on the cells in each grid to change its shape.</p>
          <BlockEditorRotation />
        </div>
        <div className="row">
          <button className="button-primary" onClick={this.handleAddRotation}>Add rotation</button>
        </div>
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
  return bindActionCreators({ editorChangeName, editorChangeDimHeight, editorChangeDimWidth, editorChangeColor, editorCreateRotation }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BlockEditorForm);
