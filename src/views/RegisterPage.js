import React from 'react';
import RegisterForm from '../components/RegisterFormContainer';
import Header from '../components/Header';

const RegisterPage = () => {
  return (
    <>
      <Header text={'Registration'} />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
