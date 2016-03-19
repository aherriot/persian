import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Quiz from '../components/Quiz/Quiz';
import {fetchWords} from '../actions/words';
import {
  selectWord,
  checkWord,
  markCorrect,
  markWrong,
  undoMarkWrong,
  showQuizOptions,
  updateQuizOptions,
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
      checkWord,
      markCorrect,
      markWrong,
      undoMarkWrong,
      showQuizOptions,
      updateQuizOptions,
      startEditingWord,
      revertEditWord
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
