import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Leaderboard from '../components/Leaderboard';
import * as leaderboardActions from 'store/leaderboard/actions';

function mapStateToProps(state) {
  return {
    leaderboard: state.leaderboard,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...leaderboardActions}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard);
