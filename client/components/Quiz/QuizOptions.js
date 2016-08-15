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
      selectionAlgorithm: this.props.options.selectionAlgorithm
    }
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

  onSave = (e) => {
    e.preventDefault();
    this.props.setQuizOptions(this.state);
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
          <input type="text"
            onChange={this.onFilterChanged}
            defaultValue={this.props.options.filter}
            placeholder="Filter by Tags" />
          <br/>

          <select onChange={this.onAlgorithmChanged} value={this.state.selectionAlgorithm}>
            <option value={constants.LEITNER}>Least Known</option>
            <option value={constants.LEAST_RECENT}>Least Recent</option>
            <option value={constants.RANDOM}>Random</option>
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
