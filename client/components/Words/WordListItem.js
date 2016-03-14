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
    if(confirm('Are you sure you want to delete this word?')) {
      this.props.deleteWord(this.props.word);
    }
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
            {word.scores}
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
          <div className={styles['persian-col']}>{word.persian}</div>
          <div className={styles.col}>{word.english}</div>
          <div className={styles.col}>{word.phonetic}</div>
          <div className={styles.col}>{word.tags.join(',')}</div>
          <div className={styles.col}>{word.scores}</div>

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
