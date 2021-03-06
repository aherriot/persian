import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as studyActions from './actions'
import * as wordActions from 'store/words/actions'
import * as scoreActions from 'store/scores/actions'
import { addSuggestion } from 'store/suggestions/actions'
import { showAlert } from 'store/app/actions'
import { openAuthModal } from 'store/auth/actions'
import Study from '../view'

function mapStateToProps(state) {
  return {
    auth: state.data.auth,
    words: state.data.words,
    scores: state.data.scores,
    study: state.routes.study
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...studyActions,
        ...wordActions,
        ...scoreActions,
        addSuggestion,
        openAuthModal,
        showAlert
      },
      dispatch
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Study)
