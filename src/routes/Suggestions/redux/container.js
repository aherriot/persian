import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as suggestionsActions from 'store/suggestions/actions'
// import * as actions from './actions'

import Suggestions from '../'

function mapStateToProps(state) {
  return {
    auth: state.data.auth,
    suggestions: state.data.suggestions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...suggestionsActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions)
