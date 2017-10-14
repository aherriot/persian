import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as wordActions from 'store/words/actions'
import Quiz from '../'

function mapStateToProps(state) {
  return {
    words: state.data.words
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...wordActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
