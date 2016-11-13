import React, {Component} from 'react';

import WordListItem from './WordListItem';
import WordEditForm from '../WordEditForm';

import constants from 'constants/constants';
import styles from '../Words.css';


export default class WordList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
      sortColumn: constants.ENGLISH,
      sortDirection: constants.ASCENDING,
      showAll: false
    }
  }

  componentDidMount() {
    if(this.props.words.status === constants.INIT || this.props.words.status === constants.ERROR) {
      this.props.actions.fetchWords();
    }

    if(this.props.auth.role) {
      if(this.props.scores.status === constants.INIT || this.props.scores.status === constants.ERROR) {
        this.props.actions.fetchScores();
      }
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

  onShowAll = (e) => {
    e.preventDefault();
    this.setState({showAll: true});
  }

  filterWords = (words, filterText) => {

    filterText = filterText.toLowerCase();

    return words.filter(word => {
      if (filterText.length === 0)
        return true;

      if (word.english.toLowerCase().indexOf(filterText) >= 0)
        return true;

      if (word.persian.toLowerCase().indexOf(filterText) >= 0)
        return true;

      if (word.phonetic.toLowerCase().indexOf(filterText) >= 0)
        return true;

      if(word.tags.some(tag => tag.toLowerCase().indexOf(filterText) >= 0))
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

        const aScore = this.props.scores.byWordId[a._id];

        if(!aScore) {
          return -1 * sortDirection;
        }

        const bScore = this.props.scores.byWordId[b._id];
        if(!bScore) {
          return 1 * sortDirection;
        }

        const sumA = aScore.scores.reduce((sum, current) => {return sum + current;}, 0);
        const sumB = bScore.scores.reduce((sum, current) => {return sum + current;}, 0);

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
        <div>{this.props.words.error.message}</div>
        <div>
          <input type="text" placeholder="filter" onChange={this.onFilterChanged}/>
          <div className={styles.row}>
            <div className={styles.col + ' ' + styles.persianCol} onClick={this.onHeaderClicked} data="persian">فارسی</div>
            <div className={styles.col} onClick={this.onHeaderClicked} data="english">English</div>
            <div className={styles.col} onClick={this.onHeaderClicked} data="phonetic">Phonetic</div>
            <div className={styles.col} onClick={this.onHeaderClicked} data="tags">Tags</div>

            {this.props.auth.role &&
              <div className={styles.col} onClick={this.onHeaderClicked} data="scores">Scores</div>
            }

            {this.props.auth.role === 'admin' &&
              <div className={styles.col}></div>
            }
          </div>

          {(() => {
            if (this.props.words.status === constants.PENDING) {
              return <h1>Loading...</h1>;
            } else {

              let words = Object.keys(this.props.words.byId).map(wordId => {
                return this.props.words.byId[wordId];
              })

              words = this.filterWords(words, this.state.filterText);
              words = this.sortWords(words, this.state.sortColumn, this.state.sortDirection);

              if(!this.state.showAll) {
                words = words.slice(0, 19);
              }

              return words.map(word => {
                return (
                  <WordListItem
                    key={word._id}
                    word={word}
                    score={this.props.scores.byWordId[word._id]}
                    role={this.props.auth.role}
                    {...this.props.actions} />
                );
              });
            }
          })()}
        </div>

        {this.props.auth.role === 'admin' &&
          <WordEditForm
            isNew={true}
            addWord={this.props.actions.addWord}
            horizontalLayout={true}
          />
        }

        {!this.state.showAll &&
          <a href="#" onClick={this.onShowAll}>Show more</a>
        }

      </div>
    );
  }
}
WordList.propTypes = {
  actions: React.PropTypes.object.isRequired,
  words: React.PropTypes.object.isRequired
};
