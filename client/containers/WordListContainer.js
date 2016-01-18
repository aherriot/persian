import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import WordList from '../components/WordList';
import {addWord, editWord, deleteWord, fetchWords} from '../actions/words';

function mapStateToProps(state) {
  return {
    user: state.user,
    words: state.words
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({addWord, editWord, deleteWord, fetchWords}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordList);
