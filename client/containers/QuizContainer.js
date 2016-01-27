import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import Quiz from '../components/Quiz';
import {editWord, fetchWords} from '../actions/words';
import {selectWord, markCorrect, markWrong} from '../actions/quiz';


//reselect to compute derived data
const currentWordSelector = createSelector(
  state => state.words.list,
  state => state.quiz.currentWordId,
  (list, id) => {
    return list.find(word => word.id === id);
  }
);

function mapStateToProps(state) {
  return {
    user: state.user,
    words: state.words,
    quiz: state.quiz,
    currentWord: currentWordSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editWord, fetchWords, selectWord, markCorrect, markWrong
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
