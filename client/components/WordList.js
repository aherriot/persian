import React, {Component} from 'react';

import WordListItem from './WordListItem';

export default class WordList extends Component {
  constructor(props, context) {
    super(props, context);

    this.props.actions.fetchWords();
  }
  render() {
    return (
      <div>
        <h2>Word List</h2>
        <div>{this.props.words.error.message}</div>
        <ul>
          {() => {
            if (this.props.words.loading) {
              return <p>Loading</p>;
            } else {
              return this.props.words.list.map((word) => {
                return <WordListItem key={word.id} word={word} {...this.props.actions} />;
              });
            }
          }()}
        </ul>

        <input type="text" ref={(n) => this.input = n}/>
        <button onClick={() => {
          this.props.actions.addWord(this.input.value);
        }}>Add</button>

        <button onClick={() => this.props.actions.fetchWords()}>Fetch</button>

      </div>
    );
  }
}
WordList.propTypes = {
  actions: React.PropTypes.object.isRequired,
  words: React.PropTypes.object.isRequired
};
