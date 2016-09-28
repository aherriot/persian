import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import WordList from '../components/Words/WordList/WordList';
import * as wordActions from 'store/words/actions';
import {fetchScores} from 'store/scores/actions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    words: state.words,
    scores: state.scores
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...wordActions, fetchScores
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordList);
