import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchWords, bulkAddWords} from '../actions/words';

import Import from '../components/words/Import';


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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Import);
