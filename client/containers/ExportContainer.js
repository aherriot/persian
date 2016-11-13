import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {fetchWords} from 'store/words/actions';
import Export from '../components/Words/Export';

function mapStateToProps(state) {
  return {
    words: state.words
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({fetchWords}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Export);
