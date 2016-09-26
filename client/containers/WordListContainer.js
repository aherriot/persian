import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import WordList from '../components/Words/WordList';
import * as wordActions from '../actions/words';
import {fetchScores} from '../actions/scores';

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
