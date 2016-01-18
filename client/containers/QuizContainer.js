import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Quiz from '../components/Quiz';
import {editWord} from '../actions/words';
import {selectWord} from '../actions/quiz';

function mapStateToProps(state) {
  return {
    user: state.user,
    quiz: state.quiz,
    words: state.words
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({editWord, selectWord}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
