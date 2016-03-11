import React, {Component} from 'react';

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
    this.setState({
      fromLang: e.target.value
    });
  }

  onToLangChanged = (e) => {
    this.setState({
      toLang: e.target.value
    });
  }

  onFilterChanged = (e) => {
    this.setState({
      filter: e.target.value
    })
  }

  onSave = (e) => {
    e.preventDefault();
    this.props.updateQuizOptions(this.state);
  }

  render() {
    return (
      <div>
        <h2>Quiz Options</h2>
        <form>
          <input type="radio"
            name="fromLang"
            value="english"
            defaultChecked={this.props.options.fromLang === "english"}
            onChange={this.onFromLangChanged}
          /> English
          <input type="radio"
            name="fromLang"
            value="phonetic"
            defaultChecked={this.props.options.fromLang === "phonetic"}
            onChange={this.onFromLangChanged}
          /> Phonetic
          <input type="radio"
            name="fromLang"
            value="persian"
            defaultChecked={this.props.options.fromLang === "persian"}
            onChange={this.onFromLangChanged}
          /> Persian

          <br />
          <input type="radio"
            name="toLang"
            value="english"
            defaultChecked={this.props.options.toLang === "english"}
            onChange={this.onToLangChanged}
            /> English
          <input type="radio"
            name="toLang"
            value="phonetic"
            defaultChecked={this.props.options.toLang === "phonetic"}
            onChange={this.onToLangChanged}
            /> Phonetic
          <input type="radio"
            name="toLang"
            value="persian"
            defaultChecked={this.props.options.toLang === "persian"}
            onChange={this.onToLangChanged}
            /> Persian

          <br/>
          <input type="text"
            onChange={this.onFilterChanged}
            defaultValue={this.props.options.filter}
            placeholder="Filter by Tags" />
          <br/>

          <select>
            <option value="LEITNER">Leitner</option>
          </select>

          <br/>
          <button onClick={this.onSave}>Save</button>
        </form>
      </div>
    );
  }
}

export default QuizOptions;
