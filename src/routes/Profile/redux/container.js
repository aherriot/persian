import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from 'store/auth/actions.js'
import Profile from '../'

function mapStateToProps(state) {
  return {
    auth: state.data.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ logout }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
