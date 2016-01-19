import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Quiz from '../components/Quiz';
import {editWord, fetchWords} from '../actions/words';
import {selectWord} from '../actions/quiz';

function mapStateToProps(state) {
  return {
    user: state.user,
    words: state.words
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({editWord, fetchWords, selectWord}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
