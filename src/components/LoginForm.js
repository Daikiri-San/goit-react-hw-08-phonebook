import React from 'react';
import styled, { css } from 'styled-components';
import { Formik } from 'formik';
import withThemeContext from './hoc/withTheme';
import Notification from './Notification';

const Form = styled.form`
  max-width: 54rem;
  box-shadow: ${props => props.shadow};
  padding: 1.4rem 1.6rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  background-color: snow;
`;

const Label = styled.label`
  font-size: 2.4rem;
  cursor: pointer;
  ${props =>
    props.error &&
    css`
      color: red;
    `}
`;

const Input = styled.input`
  font-size: 2.2rem;
  width: 100%;
  margin-bottom: 2rem;
  padding: 1.4rem 1.2rem 1.2rem;
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
  font-size: 2rem;
  margin: 2rem auto 0;
  width: 70%;
  padding: 1.8rem;
  border-radius: 1rem;
  background-color: #1d2bcc;
  cursor: pointer;
  color: snow;

  &:hover,
  &:focus {
    background-color: #404fff;
    color: snow;
    border-color: #404fff;
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
              Registrate
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default withThemeContext(LoginForm);
