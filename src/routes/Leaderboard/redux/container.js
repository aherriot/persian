import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as leaderboardActions from 'store/leaderboard/actions'
// import * as actions from './actions'

import Suggestions from '../'

function mapStateToProps(state) {
  return {
    auth: state.data.auth,
    leaderboard: state.data.leaderboard
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...leaderboardActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions)
