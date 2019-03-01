import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changePassword, logout } from 'store/auth/actions'
import { fetchWords } from 'store/words/actions'
import { fetchScores } from 'store/scores/actions'

import * as actions from './actions'

import Profile from '../view'

function mapStateToProps(state) {
  return {
    auth: state.data.auth,
    profile: state.routes.profile,
    words: state.data.words,
    scores: state.data.scores
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...actions, changePassword, logout, fetchWords, fetchScores },
      dispatch
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
