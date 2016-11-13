import React, {Component} from 'react';
import constants from '../../constants/constants';
import {thirdSide} from '../../utils';

class QuizOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromLang: this.props.options.fromLang,
      toLang: this.props.options.toLang,
      filter: this.props.options.filter,
      selectionAlgorithm: this.props.options.selectionAlgorithm,
      typeResponse: this.props.options.typeResponse,
      currentBucket: this.props.currentBucket
    }

    this.bucketNumbers = [];
    for(let i = 0; i < constants.MAX_BUCKET + 1; i++) {
      this.bucketNumbers.push(i);
    }

    const tags = {};
    Object.keys(this.props.words.byId).forEach(key => {
      const word = this.props.words.byId[key]
      word.tags.forEach(tag => {
        tags[tag] = true
      })
    })

    this.tags = Object.keys(tags).sort()

  }

  onFromLangChanged = (e) => {

    let toLang = this.state.toLang;

    if(e.target.value === this.state.toLang) {
      toLang = e.target.value === constants.ENGLISH ? constants.PHONETIC : constants.ENGLISH;
    }

    this.setState({
      fromLang: e.target.value,
      toLang: toLang
    });
  }

  onToLangChanged = (e) => {

    let fromLang = this.state.fromLang;

    if(e.target.value === this.state.fromLang) {
      fromLang = e.target.value === constants.ENGLISH ? constants.PHONETIC : constants.ENGLISH;
    }

    this.setState({
      toLang: e.target.value,
      fromLang: fromLang
    });
  }

  onFilterChanged = (e) => {
    this.setState({
      filter: e.target.value
    });
  }

  onAlgorithmChanged = (e) => {
    this.setState({
      selectionAlgorithm: e.target.value
    });
  }

  onCurrentBucketChanged = (e) => {
    this.setState({
      currentBucket: Number(e.target.value)
    })
  }

  onTypeResponseChanged = (e) => {
    this.setState({
      typeResponse: e.target.checked
    });
  }

  onSave = (e) => {
    e.preventDefault();
    this.props.setQuizOptions(this.state, this.state.currentBucket);
  }

  onRevert = (e) => {
    e.preventDefault();
    this.props.revertQuizOptions();
  }

  render() {
    return (
      <div>
        <h2>Quiz Options</h2>
        <form>
          <label><strong>Front of flashcard</strong></label>
          <br />

          <label>
            <input type="radio"
              name="fromLang"
              value="english"
              checked={this.state.fromLang === "english"}
              onChange={this.onFromLangChanged}
            />
            English
          </label>

          <label>
            <input type="radio"
              name="fromLang"
              value="phonetic"
              checked={this.state.fromLang === "phonetic"}
              onChange={this.onFromLangChanged}
            />
            Phonetic
          </label>

          <label>
            <input type="radio"
              name="fromLang"
              value="persian"
              checked={this.state.fromLang === "persian"}
              onChange={this.onFromLangChanged}
            />
          Persian
          </label>

          <br />
          <label><strong>Back of flashcard</strong></label>
          <br />

          <label>
            <input type="radio"
              name="toLang"
              value="english"
              checked={this.state.toLang === "english"}
              onChange={this.onToLangChanged}
            />
            English
          </label>

          <label>
            <input type="radio"
              name="toLang"
              value="phonetic"
              checked={this.state.toLang === "phonetic"}
              onChange={this.onToLangChanged}
            />
            Phonetic
          </label>

          <label>
            <input type="radio"
              name="toLang"
              value="persian"
              checked={this.state.toLang === "persian"}
              onChange={this.onToLangChanged}
              />
            Persian
          </label>

          <br/>
          <label>Filter:</label>
          <br />
          <select onChange={this.onFilterChanged} defaultValue={this.props.options.filter}>
            <option value=''>No filter</option>
            {this.tags.map(tag =>
              <option key={tag} value={tag}>{tag}</option>
            )}
          </select>
          <br/>

          <label htmlFor="algorithmChangeSelect">Word Selection Algorithm</label>
          <select id="algorithmChangeSelect" onChange={this.onAlgorithmChanged} value={this.state.selectionAlgorithm}>
            <option value={constants.LEITNER}>Least Known</option>
            <option value={constants.LEAST_RECENT}>Least Recent</option>
            <option value={constants.RANDOM}>Random</option>
          </select>

          <br/>
          <input
            type="checkbox"
            id="typeResponseCheckbox"
            checked={this.state.typeResponse}
            onChange={this.onTypeResponseChanged}>
          </input>
          <label htmlFor="typeResponseCheckbox">Type Response</label>

          <br/>
          <label htmlFor="currentBucketSelect">Current Bucket</label>
          <select id="currentBucketSelect" onChange={this.onCurrentBucketChanged} value={this.state.currentBucket}>
            {this.bucketNumbers.map(i =>
              <option key={i} value={i}>{i}</option>
            )}
          </select>

          <br/>
          <button onClick={this.onSave}>Save</button>
          <button onClick={this.onRevert}>Revert</button>

        </form>
      </div>
    );
  }
}

export default QuizOptions;
