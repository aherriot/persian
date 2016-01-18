import React, {Component} from 'react';

import WordListItem from './WordListItem';

export default class WordList extends Component {
  constructor(props, context) {
    super(props, context);

    if (this.props.words.list.length === 0) {
      this.props.actions.fetchWords();
    }
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

        <input type="text" placeholder="persian" ref={(n) => this.persianInput = n}/>
        <input type="text" placeholder="english" ref={(n) => this.englishInput = n}/>
        <input type="text" placeholder="phonetic" ref={(n) => this.phoneticInput = n}/>

        <button onClick={() => {
          this.props.actions.addWord({
            persian: this.persianInput.value,
            english: this.englishInput.value,
            phonetic: this.phoneticInput.value
          });
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
