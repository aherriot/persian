import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {login, logout} from '../actions/auth';
import Header from '../components/Header';

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({login, logout}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
