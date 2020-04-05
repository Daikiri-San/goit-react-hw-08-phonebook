import React from 'react';
import LoginForm from '../components/LoginFormContainer';
import Header from '../components/Header';

const LoginPage = () => {
  return (
    <>
      <Header text={'Login'} />
      <LoginForm />
    </>
  );
};

export default LoginPage;
