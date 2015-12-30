import React from 'react';

export default class WordListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.word.english}
        &nbsp;
        <a href="#"
          onClick={() => this.props.editWord(this.props.word.id, 'edited')}>edit</a>
        &nbsp;
        <a
          href="#"
          onClick={() => this.props.deleteWord(this.props.word.id)}
        >delete</a>
      </div>
    );
  }
}
