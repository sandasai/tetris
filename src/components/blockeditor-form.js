import React, { Component } from 'react';
import _ from 'lodash';
import { CirclePicker } from 'react-color';
import { editorChangeName, editorChangeDim, editorChangeColor, editorCreateRotation } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlockEditorRotation from './blockeditor-rotations.js';
import { Button } from 'rebass';

class BlockEditorForm extends Component {
  constructor(props) {
    super(props);
  }
  handleCellClick = (coord) => {
    //do something
  }
  handleNameChange = (e) => {
    this.props.editorChangeName(e.target.value);
  }
  handleDimSelectChange = (e, dim) => {
    let { width, height } = this.props.editor;
    if (dim === 'width') {
      width = e.target.value;
    } else if (dim === 'height') {
      height = e.target.value;
    }
    this.props.editorChangeDim(width, height);
  }
  handleColorChange = (e) => {
    this.props.editorChangeColor(e.hex);
  }
  handleSave(e) {
  }
  handleAddBlock = () => {
    this.props.editorCreateRotation();
  }
  selectDimensions(length, dim) {
    return (
      <select className="u-full-width"
              id={dim}
              onChange={(e) => this.handleDimSelectChange(e, dim)}
              value={4}>
        {_.times(length, (num) => {
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
        <div className="row">
          <div className="three columns">
            <label htmlFor="blockName">Block Name: </label>
            <input className="u-full-width" id="blockName" type="text" value={name} onChange={this.handleNameChange}/>
          </div>
          <div className="two columns">
            <label htmlFor="width">Width</label>
            {this.selectDimensions(5, 'width')}
          </div>
          <div className="two columns">
            <label htmlFor="height">Height</label>
            {this.selectDimensions(5, 'height')}
          </div>
          <div className="five columns">
            <CirclePicker
              color={blockType.color}
              onChange={this.handleColorChange}
              />
          </div>
        </div>
        <div className="row">
          <button className="button-primary" onClick={this.handleAddBlock}>Add rotation</button>
        </div>
        <div className="row">
          <BlockEditorRotation />
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
  return bindActionCreators({ editorChangeName, editorChangeDim, editorChangeColor, editorCreateRotation }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BlockEditorForm);
