import React, { Component } from 'react';
import { connect } from 'react-redux';
import withThemeContext from './hoc/withTheme';
import { authOperations, authSelectors } from '../redux/auth';
import RegisterForm from './RegisterForm';

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

  register = (name, email, password) => {
    const { onRegister } = this.props;
    const checkedPassword = password.length >= 7;
    if (!checkedPassword) {
      this.setState({
        notice: 'Hey! Password need to be longer than 7 symbols :)',
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
    const newUser = {
      name,
      email,
      password,
    };
    this.errorOnLog();
    onRegister(newUser);
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
      5600,
    );
  };

  render() {
    return (
      <RegisterForm
        {...this.props}
        registrate={this.register}
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
  onRegister: authOperations.register,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withThemeContext(RegisterFormContainer));
