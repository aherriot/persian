import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changePassword, logout } from 'store/auth/actions'
import * as actions from './actions'

import Profile from '../'

function mapStateToProps(state) {
  return {
    auth: state.data.auth,
    profile: state.routes.profile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...actions, changePassword, logout },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
