import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Quiz from '../components/Quiz/Quiz';
import {fetchWords} from 'store/words/actions';
import * as scoreActions from 'store/scores/actions';
import * as quizActions from 'store/quiz/actions';


function mapStateToProps(state) {
  return {
    words: state.words,
    scores: state.scores,
    quiz: state.quiz,
    auth: state.auth
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
