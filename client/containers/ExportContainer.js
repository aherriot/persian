import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {fetchWords} from '../actions/words';
import Export from '../components/words/Export';

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Export);
