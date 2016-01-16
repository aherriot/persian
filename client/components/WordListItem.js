import React, {Component} from 'react';

export default class WordListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    }
  }

  onToggleEdit = (e) => {
    e.preventDefault();
    this.setState({
      editing: !this.state.editing
    });
  }

  onSave = (e) => {
    e.preventDefault();
    this.props.editWord({...this.props.word, english: this.refs.english.value});
    this.setState({editing: false});
  }

  render() {
    let {word, editWord, deleteWord} = this.props;

    if(this.state.editing) {
      return (
        <div>
          <input type="text" ref="english" defaultValue={word.english} />{' '}
          <a href="#" onClick={this.onSave}>save</a>{' '}
          <a href="#" onClick={this.onToggleEdit}>revert</a>
        </div>
      )
    } else {
      return (
        <div>
          {word.english}{' '}
          <a href="#" onClick={this.onToggleEdit}>edit</a>{' '}
          <a href="#" onClick={() => deleteWord(word)}>delete</a>
        </div>
      );
    }

  }
}
