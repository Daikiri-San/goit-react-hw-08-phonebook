import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { authSelectors, authOperations } from '../redux/auth';
import withThemeContext from './hoc/withTheme';
import Modal from './Modal';

const Container = styled.div`
  box-shadow: ${props => props.shadow};
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: snow;
`;

const Avatar = styled.img.attrs({
  alt: '',
})`
  margin-right: 0.4rem;
  max-width: 70%;
  height: auto;
  margin-bottom: 3rem;
`;

const User = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
  margin-right: 1.2rem;
  margin-bottom: 0.2rem;
  color: ${props => props.color};

  &:last-of-type {
    margin-bottom: 3rem;
  }
`;

const Profile = ({ avatar, name, onDelete, email, theme }) => {
  return (
    <Container shadow={theme.config.mainShadowBox}>
      <Avatar src={avatar} />
      <User color={theme.config.messageColor}>{name}</User>
      <User color={theme.config.messageColor}>{email}</User>
      <Modal onAccept={onDelete} text="Delete Account" />
    </Container>
  );
};

const mapStateToProps = state => ({
  name: authSelectors.getUserName(state),
  email: authSelectors.getUserEmail(state),
  avatar:
    'https://icon-library.net/images/avatar-icon-images/avatar-icon-images-7.jpg',
});

export default connect(mapStateToProps, {
  onDelete: authOperations.deleteCurrentUser,
})(withThemeContext(Profile));
