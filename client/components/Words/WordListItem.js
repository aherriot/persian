import React, {Component} from 'react';
import styles from './Words.css';

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

  onDelete = (e) => {
    if(confirm('Are you sure you want to delete the word: ' + JSON.stringify(this.props.word, null, ' '))) {
      this.props.deleteWord(this.props.word);
    }
  }

  getColor = () => {
    let max = 10;
    let scoreSum = this.props.word.scores.reduce((sum,current)=>{return sum+current;},0) / max;

    // scoreSum = Math.random();

    let red = 0;
    let green = 0;
    let blue = 0;

    if(scoreSum < 0.571) {
      red = 255;
      green = Math.floor(294*scoreSum + 67);
    } else {
      red = Math.floor(-417*scoreSum + 503);
      green = Math.floor(-139.8*scoreSum + 318);
    }

    if(scoreSum < 0.285) {
      blue = Math.floor(-189*scoreSum + 55);
    } else {
      blue = Math.floor(111*scoreSum - 30);
    }

    return `rgba(${red}, ${green}, ${blue}, 1)`
  }

  render() {
    const {word} = this.props;

    if (this.state.editing) {
      return (
        <div className={styles.row}>
          <div className={styles['persian-col']}>
            <input type="text" ref="persian" defaultValue={word.persian} />
          </div>
          <div className={styles.col}>
            <input type="text" ref="english" defaultValue={word.english} />
          </div>
          <div className={styles.col}>
            <input type="text" ref="phonetic" defaultValue={word.phonetic} />
          </div>
          <div className={styles.col}>
            <input type="text" ref="tags" defaultValue={word.tags.join(',')} />
          </div>
          <div className={styles.col}>
            {word.scores.join(',')}
          </div>
          <div className={styles.col}>
            <a href="#" onClick={this.onSave}>save</a>{' '}
            <a href="#" onClick={this.onToggleEdit}>revert</a>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.row}>
          <div className={styles.col + ' ' + styles.persianCol}>{word.persian}</div>
          <div className={styles.col}>{word.english}</div>
          <div className={styles.col}>{word.phonetic}</div>
          <div className={styles.col}>{word.tags.join(' \u00b7 ')}</div>
          <div className={styles.col}>
            {word.scores.reduce((prev, curr) => prev + curr, 0)}
          </div>

          <div className={styles.col}>
            <a href="#" onClick={this.onToggleEdit}>edit</a>{' '}
            <a href="#" onClick={this.onDelete}>delete</a>
          </div>
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
