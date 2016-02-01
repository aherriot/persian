import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchWords, bulkAddWords} from '../actions/words';


function mapStateToProps(state) {
  return {
    words: state.words
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({fetchWords, bulkAddWords}, dispatch)
  }
}

class ImportContainer extends Component {
  constructor(props) {
    super(props);
  }

  onImport = (e) => {
    e.preventDefault();
    const words = JSON.parse(this.refs.textArea.value);
    this.props.actions.bulkAddWords(words);
    return false;
  }

  render() {
    return (
      <div>
      <h1>Import</h1>
      <form onSubmit={this.onImport}>
        <textarea ref="textArea" cols="100" rows="15" /><br />
        <button>Import</button>
      </form>
      <pre>{JSON.stringify(this.props, null, ' ')}</pre>

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportContainer);
