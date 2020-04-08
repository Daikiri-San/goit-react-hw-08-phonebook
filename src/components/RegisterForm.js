import React from 'react';
import styled, { css } from 'styled-components';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import withThemeContext from './hoc/withTheme';
import routesPaths from '../routesPaths';
import Notification from './Notification';

const Form = styled.form`
  margin-bottom: 3.4rem;
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

const ErrorText = styled.p`
  color: red;
  font-size: 2rem;
  margin-top: -2rem;
  margin-bottom: 2rem;
`;

const HelpText = styled.span`
  font-size: 1.2rem;
`;

const LinkContainer = styled.div`
  display: inline-block;
  margin: 2rem auto 0;
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

function RegisterForm({ notice, apearNotice, theme, registrate }) {
  return (
    <>
      <Notification message={notice} apearNotice={apearNotice} />
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = <ErrorText>Name is Required</ErrorText>;
          }
          if (!values.email) {
            errors.email = <ErrorText>Email is Required</ErrorText>;
          }
          if (values.email && !values.email.includes('@')) {
            errors.email = (
              <ErrorText>Email needs to include "@" symbol</ErrorText>
            );
          }
          if (!values.password) {
            errors.password = <ErrorText>Password is Required</ErrorText>;
          }
          if (values.password && values.password.length < 7) {
            errors.password = (
              <ErrorText>Password need to be more than 7 symbols</ErrorText>
            );
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          registrate(values.name, values.email, values.password);
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
            {errors.name && touched.name ? (
              <Label error>
                Name
                <Input
                  error
                  type="text"
                  name="name"
                  backGroundColor={theme.config.inputColor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name && errors.name}
              </Label>
            ) : (
              <Label>
                Name
                {touched.name ? (
                  <Input
                    isValid
                    type="text"
                    name="name"
                    backGroundColor={theme.config.inputColor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                ) : (
                  <Input
                    type="text"
                    name="name"
                    backGroundColor={theme.config.inputColor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                )}
                {errors.name && touched.name && errors.name}
              </Label>
            )}

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

            {errors.password && touched.password ? (
              <Label error>
                Password <HelpText>(need to be 7+ symbols)</HelpText>
                <Input
                  error
                  type="password"
                  name="password"
                  backGroundColor={theme.config.inputColor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
              </Label>
            ) : (
              <Label>
                Password <HelpText>(need to be 7+ symbols)</HelpText>
                {touched.password ? (
                  <Input
                    isValid
                    type="password"
                    name="password"
                    backGroundColor={theme.config.inputColor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                ) : (
                  <Input
                    type="password"
                    name="password"
                    backGroundColor={theme.config.inputColor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                )}
                {errors.password && touched.password && errors.password}
              </Label>
            )}
            <Button type="submit" disabled={isSubmitting}>
              Sign up
            </Button>
            <LinkContainer>
              <MyLink to={routesPaths.login}>Log In</MyLink>
            </LinkContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default withThemeContext(RegisterForm);
