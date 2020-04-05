import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Modal } from '@material-ui/core';

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
  font-size: 2.6rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const StyledButton = styled(Button)`
  width: 10rem;
  height: 4rem;
  margin: 0 2rem;
  font-size: 3rem;
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
              <StyledButton
                type="button"
                color="secondary"
                variant="contained"
                onClick={onAccept}
              >
                Yes
              </StyledButton>
              <StyledButton
                type="button"
                color="primary"
                variant="contained"
                onClick={this.handleClose}
              >
                No
              </StyledButton>
            </ModalButtonsContainer>
          </ModalContainer>
        </Modal>
      </>
    );
  }
}

export default ModalWindow;
