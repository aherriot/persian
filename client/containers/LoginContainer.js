import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Login from '../components/Login';
import {login} from '../actions/auth';

function mapStateToProps(state) {
  return state.auth;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({login}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
