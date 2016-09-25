import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Quiz from '../components/Quiz/Quiz';
import {fetchWords} from '../actions/words';
import * as scoreActions from '../actions/scores';

import * as quizActions from '../actions/quiz';


function mapStateToProps(state) {
  return {
    words: state.words,
    quiz: state.quiz
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...quizActions, ...scoreActions, fetchWords}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
