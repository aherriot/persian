import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Quiz from '../components/Quiz/Quiz';
import {editWord, fetchWords} from '../actions/words';
import {selectWord, checkWord, markCorrect, markWrong,
  showQuizOptions, updateQuizOptions} from '../actions/quiz';


function mapStateToProps(state) {
  return {
    words: state.words,
    quiz: state.quiz
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editWord,
      fetchWords,
      selectWord,
      checkWord,
      markCorrect,
      markWrong,
      showQuizOptions,
      updateQuizOptions
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
