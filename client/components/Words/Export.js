import React, {Component} from 'react';
import * as constants from '../../constants/constants';


class Export extends Component {
  constructor(props) {
    super(props);

    if(this.props.words.status !== constants.SUCCESS) {
      this.props.actions.fetchWords();
    }

    this.state = {
      filter: '',
      format: 'vertical-bar'
    };
  }

  onFilterChange = (e) => {
    this.setState({filter: e.target.value});
  }

  onFormatChange = (e) => {
    this.setState({format: e.target.value});
  }

  format = (words) => {
    if(this.state.format === 'json') {
      return JSON.stringify(words);
    } else if (this.state.format === 'vertical-bar') {
      return words.map((word) => {
        return word.english + '|' +
               word.persian + '|' +
               word.phonetic + '|' +
               word.tags.join(',');
      }).join('\n');

    } else {
      return '';
    }
  }

  render() {
    const filter = this.state.filter;
    const filteredWords = this.props.words.list.filter(word => {
      if(filter.length === 0)
        return true;

      if(word.english.indexOf(filter) >= 0)
        return true;

      if(word.persian.indexOf(filter) >= 0)
        return true;

      if(word.phonetic.indexOf(filter) >= 0)
        return true;

      if(word.tags.some(tag => tag.indexOf(filter) >= 0))
        return true;

      return false;
    });

    return (
      <div>
        <h1>Export</h1>

        <input type="text"
          placeholder="filter"
          value={this.state.filter}
          onChange={this.onFilterChange}/>
        <br />

        <input type="radio"
          id="vertical-bar-radio"
          name="format"
          value="vertical-bar"
          onChange={this.onFormatChange}
          defaultChecked="true"/>
        <label htmlFor="vertical-bar-radio">Vertical Bar Separated</label>

        <input  type="radio"
          id="json-radio"
          name="format"
          value="json"
          onChange={this.onFormatChange} />
        <label htmlFor="json-radio">JSON</label>

        <br/>
        <textarea cols="100" rows="20" value={this.format(filteredWords)} readOnly="true"/>
      </div>
    );
  }
}

export default Export;
