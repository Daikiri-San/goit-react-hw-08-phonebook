import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authOperations } from '../redux/auth';
import App from './App';

class AppContainer extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }
  render() {
    return <App {...this.props} />;
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(AppContainer);
