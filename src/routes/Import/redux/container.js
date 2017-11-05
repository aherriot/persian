import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addWord } from 'store/words/actions'

import Import from '../'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ addWord }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Import)
