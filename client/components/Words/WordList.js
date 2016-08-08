import React, {Component} from 'react';
import {Link} from 'react-router';

import WordListItem from './WordListItem';
import WordEditForm from './WordEditForm';

import constants from '../../constants/constants';
import styles from './Words.css';


export default class WordList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
      sortColumn: constants.ENGLISH,
      sortDirection: constants.ASCENDING,
    }

  }

  componentWillMount() {
    // if(!this.props.auth.username) {
    //   this.props.router.push('/login');
    // }

    if (this.props.words.list.length === 0) {
      this.props.actions.fetchWords();
    }
  }

  onFilterChanged = (e) => {
    this.setState({filterText: e.target.value});
  }

  onHeaderClicked = (e) => {
    let col = e.target.getAttribute('data');

    this.setState({
      sortColumn: col,
      sortDirection: this.state.sortColumn === col ? this.state.sortDirection*-1 : this.state.sortDirection
    });
  }

  filterWords = (words, filterText) => {
    return words.filter(word => {
      if (filterText.length === 0)
        return true;

      if (word.english.indexOf(filterText) >= 0)
        return true;

      if (word.persian.indexOf(filterText) >= 0)
        return true;

      if (word.phonetic.indexOf(filterText) >= 0)
        return true;

      if(word.tags.some(tag => tag.indexOf(filterText) >= 0))
        return true;

      return false;
    });
  }

  sortWords = (words, sortColumn, sortDirection) => {

    if(sortColumn === constants.TAGS) {
      return words.sort((a,b) => {
        a = a[sortColumn].join(',').toLocaleLowerCase();
        b = b[sortColumn].join(',').toLocaleLowerCase();
        return a.localeCompare(b)*sortDirection;
      });
    } else if(sortColumn === constants.SCORES) {
      return words.sort((a,b) => {
        const sumA = a.scores.reduce((sum, current) => {return sum + current;}, 0);
        const sumB = b.scores.reduce((sum, current) => {return sum + current;}, 0);
        return (sumA > sumB ? 1 : -1) * sortDirection;
      });
    } else {
      return words.sort((a, b) => {
        a = a[sortColumn].toLocaleLowerCase();
        b = b[sortColumn].toLocaleLowerCase();
        return a.localeCompare(b)*sortDirection;
      });
    }
  }

  render() {

    return (
      <div>
        <h2>Word List</h2>
        <div>{this.props.words.error.message}</div>
        <div>
          <Link to="/words/import">Import</Link>{' '}
          <Link to="/words/export">Export</Link>
        </div>
        <div>
          <input type="text" placeholder="filter" onChange={this.onFilterChanged}/>
          <div className={styles.row} data="test">
            <div className={styles['persian-col']} onClick={this.onHeaderClicked} data="persian">Persian</div>
            <div className={styles.col} onClick={this.onHeaderClicked} data="english">English</div>
            <div className={styles.col} onClick={this.onHeaderClicked} data="phonetic">Phonetic</div>
            <div className={styles.col} onClick={this.onHeaderClicked} data="tags">Tags</div>
            <div className={styles.col} onClick={this.onHeaderClicked} data="scores">Scores</div>
          </div>

          {() => {
            if (this.props.words.loading) {
              return <p>Loading</p>;
            } else {

              let words = this.filterWords(this.props.words.list, this.state.filterText);
              words = this.sortWords(words, this.state.sortColumn, this.state.sortDirection);

              return words.map(word => {
                return <WordListItem key={word._id} word={word} {...this.props.actions} />;
              });
            }
          }()}
        </div>

        <WordEditForm
          isNew={true}
          addWord={this.props.actions.addWord}
          horizontalLayout={true}
        />

      </div>
    );
  }
}
WordList.propTypes = {
  actions: React.PropTypes.object.isRequired,
  words: React.PropTypes.object.isRequired
};
