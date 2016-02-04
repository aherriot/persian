import React, {Component} from 'react';

export default class WordListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  onToggleEdit = (e) => {
    e.preventDefault();
    this.setState({
      editing: !this.state.editing
    });
  }

  onSave = (e) => {
    e.preventDefault();
    this.props.editWord({
      ...this.props.word,
      persian: this.refs.persian.value,
      english: this.refs.english.value,
      phonetic: this.refs.phonetic.value,
      tags: this.refs.tags.value.split(',').map(tag => tag.trim())
    });
    this.setState({editing: false});
  }

  render() {
    const {word, deleteWord} = this.props;

    if (this.state.editing) {
      return (
        <div>
          <input type="text" ref="persian" defaultValue={word.persian} />{' '}
          <input type="text" ref="english" defaultValue={word.english} />{' '}
          <input type="text" ref="phonetic" defaultValue={word.phonetic} />{' '}
          <input type="text" ref="tags" defaultValue={word.tags.join(',')} />{' '}

          <a href="#" onClick={this.onSave}>save</a>{' '}
          <a href="#" onClick={this.onToggleEdit}>revert</a>
        </div>
      );
    } else {
      return (
        <div>
          {word.persian}{' '}
          {word.english}{' '}
          {word.phonetic}{' '}
          {word.scores}{' '}
          {word.tags.join(',')}{' '}

          <a href="#" onClick={this.onToggleEdit}>edit</a>{' '}
          <a href="#" onClick={() => deleteWord(word)}>delete</a>
        </div>
      );
    }
  }
}
WordListItem.propTypes = {
  editWord: React.PropTypes.func.isRequired,
  deleteWord: React.PropTypes.func.isRequired,
  word: React.PropTypes.object.isRequired
};
