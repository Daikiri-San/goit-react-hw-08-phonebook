import React, { Component } from 'react';
import { connect } from 'react-redux';
import withThemeContext from './hoc/withTheme';
import { authOperations, authSelectors } from '../redux/auth';
import LoginForm from './LoginForm';

let AnimationStartID;
let AnimationEndID;

class RegisterFormContainer extends Component {
  state = {
    apearNotice: false,
    notice: null,
  };

  componentWillUnmount() {
    clearTimeout(AnimationStartID);
    clearTimeout(AnimationEndID);
  }

  logIn = async (email, password) => {
    const { onLogIn } = this.props;
    const checkedPassword = password.length !== 0;
    if (!checkedPassword) {
      this.setState({
        notice: 'Hey! You need to enter the password :)',
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
    this.errorOnLog();
    onLogIn(user);
  };

  errorOnLog = () => {
    AnimationStartID = setTimeout(
      () =>
        this.setState({
          apearNotice: true,
        }),
      1000,
    );
    AnimationEndID = setTimeout(
      () =>
        this.setState({
          apearNotice: false,
        }),
      5000,
    );
  };

  render() {
    return (
      <LoginForm
        {...this.props}
        logIn={this.logIn}
        error={this.errorOnLog}
        apearNotice={this.state.apearNotice}
        notice={this.state.notice}
      />
    );
  }
}

const mapStateToProps = state => ({
  hasError: authSelectors.getError(state),
});

const mapDispatchToProps = {
  onLogIn: authOperations.logIn,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withThemeContext(RegisterFormContainer));
