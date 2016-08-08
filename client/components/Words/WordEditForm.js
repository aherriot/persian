import React, {Component} from 'react';
import classNames from 'classnames';

import styles from './Words.css';

export default class WordEditForm extends Component {
  constructor() {
    super();
  }

  onAddWord = (e) => {
    e.preventDefault();
    this.props.addWord({
      persian: this.refs.persian.value,
      english: this.refs.english.value,
      phonetic: this.refs.phonetic.value,
      tags: this.refs.tags.value.split(',').map(tag => tag.trim())
    });

    this.refs.persian.value = '';
    this.refs.english.value = '';
    this.refs.phonetic.value = '';
    this.refs.tags.value = '';

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


    if(this.props.word) {
      var english = this.props.word.english;
      var persian = this.props.word.persian;
      var phonetic = this.props.word.phonetic;
      var tags = this.props.word.tags.join(',');
    }

    const fieldClasses = classNames({[styles.col]: this.props.horizontalLayout});
    return (

      <div>
        <div className={classNames({[styles.row]: this.props.horizontalLayout})}>
          <div className={classNames({[styles['persian-col']]: this.props.horizontalLayout})}>
            <input type="text" placeholder="persian" defaultValue={persian} ref="persian"/>
          </div>
          <div className={fieldClasses}>
            <input type="text" placeholder="english" defaultValue={english} ref="english"/>
          </div>
          <div className={fieldClasses}>
            <input type="text" placeholder="phonetic" defaultValue={phonetic} ref="phonetic"/>
          </div>
          <div className={fieldClasses}>
            <input type="text" placeholder="tags" defaultValue={tags} ref="tags"/>
          </div>
          <div className={fieldClasses}>

          </div>
          <div className={fieldClasses}>
            {buttons}
          </div>
        </div>
      </div>
    );
  }
}
