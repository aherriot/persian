import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import CreateAccount from '../components/CreateAccount';
import {createAccount} from '../actions/auth';

function mapStateToProps(state) {
  return state.auth;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createAccount}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccount);
