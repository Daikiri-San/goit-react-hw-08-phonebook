import React, { Component } from 'react';
import { connect } from 'react-redux';
import withThemeContext from './hoc/withTheme';
import authOperations from '../redux/auth/authOperations';
import RegisterForm from './RegisterForm';

class RegisterFormContainer extends Component {
  state = {
    apearNotice: false,
    notice: null,
  };

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
    onRegister(newUser);
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

const mapDispatchToProps = {
  onRegister: authOperations.register,
};

export default connect(
  null,
  mapDispatchToProps,
)(withThemeContext(RegisterFormContainer));
