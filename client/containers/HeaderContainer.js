import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as authActions from 'store/auth/actions';
import { fetchScores } from 'store/scores/actions';
import Header from '../components/Header';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    routing: state.routing,
    words: state.words,
    scores: state.scores
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions,
      fetchScores
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
