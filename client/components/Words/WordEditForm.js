import React, {Component} from 'react';

import styles from './Words.css';

export default class WordEditForm extends Component {
  constructor() {
    super();
  }

  onAddWord = (e) => {
    e.preventDefault();
    this.props.addWord({
      persian: this.persianInput.value,
      english: this.englishInput.value,
      phonetic: this.phoneticInput.value,
      tags: this.tagsInput.value.split(',').map(tag => tag.trim())
    });
  }

  onSave = (e) => {
    e.preventDefault();
    this.props.quizEditWord({
      ...this.props.word,
      persian: this.refs.persian.value,
      english: this.refs.english.value,
      phonetic: this.refs.phonetic.value,
      tags: this.refs.tags.value.split(',').map(tag => tag.trim())
    });
  }

  onRevert = (e) => {
    e.preventDefault();
    this.props.revert();
  }

  render() {

    let buttons;

    if(this.props.isNew) {
      buttons = (<a href="#" onClick={this.onAddWord}>add</a>);
    } else {
      buttons = (
        <span>
          <a href="#" onClick={this.onSave}>save</a>{' '}
          <a href="#" onClick={this.onRevert}>revert</a>
        </span>
      );
    }

    return (
      <div>
        <div className={styles.row}>
          <div className={styles['persian-col']}>
            <input type="text" placeholder="persian" defaultValue={this.props.word.persian} ref="persian"/>
          </div>
          <div className={styles.col}>
            <input type="text" placeholder="english" defaultValue={this.props.word.english} ref="english"/>
          </div>
          <div className={styles.col}>
            <input type="text" placeholder="phonetic" defaultValue={this.props.word.phonetic} ref="phonetic"/>
          </div>
          <div className={styles.col}>
            <input type="text" placeholder="tags" defaultValue={this.props.word.tags.join(',')} ref="tags"/>
          </div>
          <div className={styles.col}>

          </div>
          <div className={styles.col}>
            {buttons}
          </div>
        </div>
      </div>
    );
  }
}
