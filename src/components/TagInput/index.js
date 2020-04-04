import React, { Component } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import connect from "react-redux/es/connect/connect";

function handleDelete(i) {
  this.props.tags.splice(i, 1);
  this.props.setState({ tags: this.props.tags });
}

function handleAddition (tag) {
  this.props.setState({ tags: [].concat(this.props.tags, tag) });
}

class TagInput extends Component {
  render = () =>
    <ReactTags
      tags={this.props.tags}
      suggestions={this.props.suggestions}
      placeholder={this.props.store.lang.tagInput.addTag}
      handleDelete={handleDelete.bind(this)}
      handleAddition={handleAddition.bind(this)}
      allowDragDrop={false}
      autofocus={false}
      classNames={{
        tagInputField: 'tag-input',
        tag: 'tag float-left',
        remove: 'ml-2',
        suggestions: 'suggestions',
        activeSuggestion: 'activeSuggestion'
      }}/>
}

export default connect(store => ({ store }), null)(TagInput);