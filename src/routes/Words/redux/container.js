import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as wordActions from 'store/words/actions'
import { fetchScores } from 'store/scores/actions'
import * as wordsRouteActions from './actions'
import Words from '../'

function mapStateToProps(state) {
  return {
    words: state.data.words,
    wordsRoute: state.routes.words,
    scores: state.data.scores
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...wordActions, ...wordsRouteActions, fetchScores },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Words)
