import React, {Component} from 'react';
import {Link} from 'react-router';
import WordListItem from './WordListItem';

export default class WordList extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    // if(!this.props.auth.username) {
    //   this.props.router.push('/login');
    // }

    if (this.props.words.list.length === 0) {
      this.props.actions.fetchWords();
    }
  }

  onAddWord = (e) => {
    e.preventDefault();
    this.props.actions.addWord({
      persian: this.persianInput.value,
      english: this.englishInput.value,
      phonetic: this.phoneticInput.value,
      tags: this.tagsInput.value.split(',').map(tag => tag.trim())
    });
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
        <input type="text" placeholder="tags" ref={(n) => this.tagsInput = n}/>

        <button onClick={this.onAddWord}>Add</button>

        <br />
        <Link to="/words/import">Import</Link>
        <br />
        <Link to="/words/export">Export</Link>
      </div>
    );
  }
}
WordList.propTypes = {
  actions: React.PropTypes.object.isRequired,
  words: React.PropTypes.object.isRequired
};
