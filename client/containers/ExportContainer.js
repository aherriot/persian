import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {fetchWords} from '../actions/words';

function mapStateToProps(state) {
  return {
    words: state.words
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({fetchWords}, dispatch)
  };
}

class ExportContainer extends Component {
  constructor(props) {
    super(props);

    if(!this.props.words.hasLoaded) {
      this.props.actions.fetchWords();
    }

    this.state = {
      filter: ''
    };
  }

  onFilterChange = (e) => {
    this.setState({filter: e.target.value});
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

      return false;
    });

    return (
      <div>
        <h1>Export</h1>

        <input type="text"
          placeholder="filter"
          value={this.state.filter}
          onChange={this.onFilterChange}/>

        <br/>

        <textarea cols="100" rows="20" value={JSON.stringify(filteredWords)} />
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportContainer);
