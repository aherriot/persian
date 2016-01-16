import {connect} from 'react-redux';

import Users from '../components/Users';
import {addWord} from '../actions/words';

function mapStateToProps(state) {
  return {
    words: state.words
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addWord: (word) => dispatch(addWord(word))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
