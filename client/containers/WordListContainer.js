import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {routeActions} from 'redux-simple-router';

import WordList from '../components/Words/WordList';
import {addWord, editWord, deleteWord, fetchWords} from '../actions/words';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    words: state.words
  };
}

function mapDispatchToProps(dispatch) {
  return {
    router: bindActionCreators(routeActions, dispatch),
    actions: bindActionCreators({
      addWord, editWord, deleteWord, fetchWords
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordList);
