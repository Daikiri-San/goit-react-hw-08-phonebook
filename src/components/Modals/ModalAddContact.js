import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal } from '@material-ui/core';

const ModalContainer = styled.div`
  background-color: snow;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonAdd = styled.button`
  display: block;
  font-size: 1.6rem;
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
    const { text, children } = this.props;
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
            {children}
          </ModalContainer>
        </Modal>
      </>
    );
  }
}

export default ModalWindow;
