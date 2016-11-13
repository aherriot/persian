import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchWords, bulkAddWords} from 'store/words/actions';

import Import from '../components/Words/Import';


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
