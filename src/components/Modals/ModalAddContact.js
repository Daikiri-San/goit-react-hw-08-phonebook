import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Modal } from '@material-ui/core';
import { Formik } from 'formik';
import withThemeContext from '../hoc/withTheme';

const ModalContainer = styled.div`
  border-radius: 2rem;
  background-color: #dae3ff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: none;
`;

const ButtonAdd = styled.button`
  display: block;
  font-size: 1.8rem;
  font-weight: 500;
  position: absolute;
  top: 1rem;
  left: -12rem;
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

const CloseButton = styled.button`
  display: inline-block;
  margin-left: auto;
  border: none;
  font-size: 3rem;
  border-top-right-radius: 2rem;
  border-bottom-left-radius: 1rem;
  flex-basis: 8%;
  height: 3.8rem;
  width: 3.8rem;
  background-color: #e82a2a;
  cursor: pointer;
  color: snow;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    background-color: #b80000;
    outline: none;
  }

  &:active {
    background-color: #ff8080;
  }
`;

const Form = styled.form`
  max-width: 46rem;
  padding: 0 3.6rem 2.6rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  background-color: #dae3ff;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
`;

const Label = styled.label`
  position: relative;
  font-size: 2rem;
  font-family: 'Philosopher', sans-serif;
  transition: all 0.1s linear;
  cursor: pointer;
  ${props =>
    props.error &&
    css`
      color: red;
    `}
`;

const Input = styled.input`
  outline: none;
  font-size: 1.8rem;
  width: 100%;
  margin-bottom: 2rem;
  padding: 1.2rem 1.6rem 1rem;
  border-radius: 3rem;
  border: 0.2rem solid snow;
  background-color: snow;

  &:focus {
    border-color: #1d2bcc;
  }

  ${props =>
    props.isValid &&
    css`
      border: 0.2rem solid lightgreen;
    `}
  ${props =>
    props.error &&
    css`
      border: 0.2rem solid red;
    `}
`;

const ModalButtonAdd = styled(ButtonAdd)`
  position: static;
  margin: 0 auto;
`;

const ErrorText = styled.div`
  position: absolute;
  top: 6.8rem;
  color: red;
  font-size: 1.6rem;
`;

class ModalWindow extends Component {
  state = {
    isModalOpen: false,
  };

  handleOpen = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { isModalOpen } = this.state;
    const { text, theme, onAccept } = this.props;
    return (
      <>
        <ButtonAdd
          type="button"
          color="primary"
          variant="contained"
          onClick={this.handleOpen}
        >
          {text}
        </ButtonAdd>
        <Modal
          open={isModalOpen}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <ModalContainer>
            <CloseButton onClick={this.handleClose}>×</CloseButton>
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
                const result = onAccept(values.name, values.number);
                setSubmitting(false);
                if (result !== false) {
                  resetForm();
                  this.handleClose();
                }
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
                  <ModalButtonAdd type="submit" disabled={isSubmitting}>
                    Add contact
                  </ModalButtonAdd>
                </Form>
              )}
            </Formik>
          </ModalContainer>
        </Modal>
      </>
    );
  }
}

export default withThemeContext(ModalWindow);
