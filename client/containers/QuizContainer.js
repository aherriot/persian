import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Quiz from '../components/Quiz/Quiz';
import {fetchWords} from '../actions/words';
import {
  selectWord,
  selfEvaluate,
  checkWord,
  markCorrect,
  markWrong,
  undoMarkWrong,
  showQuizOptions,
  setQuizOptions,
  revertQuizOptions,
  startEditingWord,
  revertEditWord,
  quizEditWord
} from '../actions/quiz';


function mapStateToProps(state) {
  return {
    words: state.words,
    quiz: state.quiz
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      quizEditWord,
      fetchWords,
      selectWord,
      selfEvaluate,
      checkWord,
      markCorrect,
      markWrong,
      undoMarkWrong,
      showQuizOptions,
      setQuizOptions,
      revertQuizOptions,
      startEditingWord,
      revertEditWord
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
