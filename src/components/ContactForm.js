import React from 'react';
import styled, { css } from 'styled-components';
import { Formik } from 'formik';
import Modal from './Modals/ModalAddContact';
import Notification from './Notification';

const Container = styled.div`
  position: relative;
`;

const Form = styled.form`
  max-width: 46rem;
  padding: 0 3.6rem 2.6rem;
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
  font-size: 1.6rem;
  margin: 0 auto;
  width: 60%;
  padding: 1.6rem;
  border-radius: 1rem;
  background-color: #1d2bcc;
  cursor: pointer;
  color: snow;
  transition: all 0.2s ease;

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

function ContactForm({ notice, apearNotice, hasError, theme, addContact }) {
  return (
    <Container>
      <Notification message={notice} apearNotice={apearNotice} />
      {hasError && <Notification message={hasError} apearNotice={true} />}
      <Modal onAccept={addContact} text="Add Contact">
        <Formik
          initialValues={{ name: '', number: '' }}
          validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = <ErrorText>Name is Required</ErrorText>;
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            addContact(values.name, values.number);
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
            <Form onSubmit={handleSubmit}>
              {errors.name ? (
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

              <Label>
                Number
                <Input
                  type="tel"
                  name="number"
                  backGroundColor={theme.config.inputColor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.number}
                />
                {errors.number && touched.number && errors.number}
              </Label>
              <Button type="submit" disabled={isSubmitting}>
                Add contact
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </Container>
  );
}

export default ContactForm;
