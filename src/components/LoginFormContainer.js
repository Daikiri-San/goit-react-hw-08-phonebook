import React, { Component } from 'react';
import { connect } from 'react-redux';
import withThemeContext from './hoc/withTheme';
import authOperations from '../redux/auth/authOperations';
import LoginForm from './LoginForm';

class RegisterFormContainer extends Component {
  state = {
    apearNotice: false,
    notice: null,
  };

  logIn = (email, password) => {
    const { onLogIn } = this.props;
    const checkedPassword = password.length !== 0;
    if (!checkedPassword) {
      this.setState({
        notice: 'Hey! You need to enter password :)',
        apearNotice: true,
      });
      return setTimeout(
        () =>
          this.setState({
            apearNotice: false,
          }),
        2400,
      );
    }
    const user = {
      email,
      password,
    };
    onLogIn(user);
  };
  render() {
    return (
      <LoginForm
        {...this.props}
        logIn={this.logIn}
        apearNotice={this.state.apearNotice}
        notice={this.state.notice}
      />
    );
  }
}

const mapDispatchToProps = {
  onLogIn: authOperations.logIn,
};

export default connect(
  null,
  mapDispatchToProps,
)(withThemeContext(RegisterFormContainer));
