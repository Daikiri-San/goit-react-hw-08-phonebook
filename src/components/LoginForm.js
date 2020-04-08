import React from 'react';
import styled, { css } from 'styled-components';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import withThemeContext from './hoc/withTheme';
import routesPaths from '../routesPaths';
import Notification from './Notification';

const Form = styled.form`
  max-width: 46rem;
  box-shadow: ${props => props.shadow};
  padding: 3.6rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  background-color: snow;
`;

const Label = styled.label`
  font-size: 2rem;
  cursor: pointer;
  ${props =>
    props.error &&
    css`
      color: red;
    `}
`;

const Input = styled.input`
  font-size: 1.8rem;
  width: 100%;
  margin-bottom: 2rem;
  padding: 1.2rem 1rem 1rem;
  border-radius: 0.6rem;
  background-color: ${props => props.backGroundColor};

  &:focus {
    border-color: #1d2bcc;
  }

  ${props =>
    props.isValid &&
    css`
      border: 0.3rem solid lightgreen;
    `}
  ${props =>
    props.error &&
    css`
      border: 0.3rem solid red;
    `}
`;

const Button = styled.button`
  display: block;
  font-size: 1.8rem;
  margin: 1.4rem auto 0;
  width: 14rem;
  padding: 1.6rem;
  border: none;
  border-radius: 1rem;
  background-color: #4a69cf;
  cursor: pointer;
  color: snow;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    background-color: #404fff;
    color: snow;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    outline: none;
  }

  &:active {
    background-color: #7883ff;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 2rem;
  margin-top: -2rem;
  margin-bottom: 2rem;
`;

const MyLink = styled(Link)`
  color: #1d2bcc;
  transition: color 0.2s linear;
  font-size: 2.2rem;
  font-family: 'Philosopher', sans-serif;

  &:hover,
  &:focus {
    color: tomato;
  }

  &:active {
    color: red;
  }
`;

const LinkContainer = styled.div`
  display: inline-block;
  margin: 2rem auto 0;
`;

function LoginForm({ notice, apearNotice, theme, logIn }) {
  return (
    <>
      <Notification message={notice} apearNotice={apearNotice} />
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = <ErrorText>Email is Required</ErrorText>;
          }
          if (values.email && !values.email.includes('@')) {
            errors.email = (
              <ErrorText>Email needs to include "@" symbol</ErrorText>
            );
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          logIn(values.email, values.password);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} shadow={theme.config.mainShadowBox}>
            {errors.email && touched.email ? (
              <Label error>
                Email
                <Input
                  error
                  type="email"
                  name="email"
                  backGroundColor={theme.config.inputColor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
              </Label>
            ) : (
              <Label>
                Email
                {touched.email ? (
                  <Input
                    isValid
                    type="email"
                    name="email"
                    backGroundColor={theme.config.inputColor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                ) : (
                  <Input
                    type="email"
                    name="email"
                    backGroundColor={theme.config.inputColor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                )}
                {errors.email && touched.email && errors.email}
              </Label>
            )}

            <Label>
              Password
              <Input
                type="password"
                name="password"
                backGroundColor={theme.config.inputColor}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Label>

            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
            <LinkContainer>
              <MyLink to={routesPaths.register}>Sign Up</MyLink>
            </LinkContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default withThemeContext(LoginForm);
