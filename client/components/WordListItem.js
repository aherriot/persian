import React, {Component} from 'react';

export default class WordListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {word, editWord, deleteWord} = this.props;

    return (
      <div>
        {word.english}
        &nbsp;
        <a href="#" onClick={() => editWord(word.id, 'edited')}>edit</a>
        &nbsp;
        <a href="#" onClick={() => deleteWord(word)}>delete</a>
      </div>
    );
  }
}
