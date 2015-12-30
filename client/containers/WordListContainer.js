import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import WordList from '../components/WordList';
import {addWord, editWord, deleteWord} from '../actions/words';

function mapStateToProps(state) {
  return {
    words: state.words
  };
}

function mapDispatchToProps(dispatch) {
  return {actions :bindActionCreators({
    addWord, editWord, deleteWord
  }, dispatch)};
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordList);
