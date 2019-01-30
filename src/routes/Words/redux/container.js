import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as wordActions from 'store/words/actions'
import { fetchScores, updateScore } from 'store/scores/actions'
import { addSuggestion } from 'store/suggestions/actions'
import * as wordsRouteActions from './actions'
import { showAlert } from 'store/app/actions'
import { setTagFilter } from 'routes/Study/redux/actions'

import Words from '../'

function mapStateToProps(state) {
  return {
    words: state.data.words,
    scores: state.data.scores,
    auth: state.data.auth,

    wordsRoute: state.routes.words,
    tagFilter: state.routes.study.options.tagFilter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...wordActions,
        ...wordsRouteActions,
        fetchScores,
        updateScore,
        addSuggestion,
        showAlert,
        setTagFilter
      },
      dispatch
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Words)
