import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const ModalContainer = styled.div`
  padding: 3rem 2.2rem;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ModalButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalText = styled.p`
  font-size: 2.2rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.6rem;
  margin: 1.4rem auto 0;
  width: 17rem;
  padding: 1rem 1.2rem;
  border: none;
  border-radius: 1rem;
  background-color: red;
  cursor: pointer;
  color: snow;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    background-color: #f02222;
    color: snow;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    outline: none;
  }

  &:active {
    background-color: tomato;
  }
`;

const ModalButtonDeny = styled(Button)`
  width: 10rem;
`;

const ModalButtonAccept = styled(Button)`
  width: 10rem;
  background-color: #4a69cf;
  margin-right: 2rem;

  &:hover,
  &:focus {
    background-color: #404fff;
  }

  &:active {
    background-color: #7883ff;
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
    const { onAccept, text } = this.props;
    return (
      <>
        <Button
          type="button"
          color="secondary"
          variant="contained"
          onClick={this.handleOpen}
        >
          {text}
          <DeleteIcon fontSize="large" />
        </Button>
        <Modal
          open={isModalOpen}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <ModalContainer>
            <ModalText>Are you sure you want to delete your account?</ModalText>
            <ModalButtonsContainer>
              <ModalButtonAccept
                type="button"
                color="secondary"
                variant="contained"
                onClick={onAccept}
              >
                Yes
              </ModalButtonAccept>
              <ModalButtonDeny
                type="button"
                color="primary"
                variant="contained"
                onClick={this.handleClose}
              >
                No
              </ModalButtonDeny>
            </ModalButtonsContainer>
          </ModalContainer>
        </Modal>
      </>
    );
  }
}

export default ModalWindow;
