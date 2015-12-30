import React from 'react';
import {Link} from 'react-router';

import WordListItem from './WordListItem';

export default class WordList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div>
        <h2>Word List</h2>

        <ul>
          {() => {
            return this.props.words.map((word) => {
              return <WordListItem key={word.id} word={word} {...this.props.actions} />;
            });
          }()}
        </ul>

        <button onClick={() => this.props.actions.addWord('new word')}>Add</button>
        <Link to="/recipes">recipes</Link>
      </div>
    );
  }
}
