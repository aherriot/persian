import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as authActions from 'store/auth/actions';
import Header from '../components/Header';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...authActions}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
