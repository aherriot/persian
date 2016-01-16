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
    addWord: (english) => dispatch(addWord(english))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
