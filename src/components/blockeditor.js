import React, { Component } from 'react';
import BlockEditorForm from './blockeditor-form';
import Grid from './grid';

export default class BlockEditor extends Component {
  render() {
    return (
      <div>
        <BlockEditorForm />
        <Grid width={4} height={4} filled={[ {r:0, c:1, color: 'red'}]} />
      </div>
    )
  }
}
