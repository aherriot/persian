import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as wordActions from 'store/words/actions'
import * as wordsRouteActions from './actions'
import Words from '../'

function mapStateToProps(state) {
  return {
    words: state.data.words,
    wordsRoute: state.routes.words
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...wordActions, ...wordsRouteActions },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Words)
