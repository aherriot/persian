import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchWords } from 'store/words/actions'
import { setTagFilter } from 'routes/Study/redux/actions'

import Export from '../'

function mapStateToProps(state) {
  return {
    words: state.data.words,
    tagFilter: state.routes.study.options.tagFilter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchWords, setTagFilter }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Export)
