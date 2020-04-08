import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { authSelectors, authOperations } from '../redux/auth';
import withThemeContext from './hoc/withTheme';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-right: 2rem;
`;

const Avatar = styled.img.attrs({
  alt: '',
})`
  margin-right: 0.4rem;
  width: 5rem;
  height: auto;
`;

const User = styled.span`
  max-width: 20rem;
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.color};
`;

const Button = styled.button`
  display: block;
  font-size: 1.8rem;
  width: 14rem;
  padding: 1rem;
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

const UserMenu = ({ avatar, name, onLogout, theme }) => {
  return (
    <Container>
      <Avatar src={avatar} />
      <User color={theme.config.messageColor}>Welcome, {name}</User>
      <Button
        type="button"
        color="primary"
        variant="contained"
        onClick={onLogout}
      >
        Logout
      </Button>
    </Container>
  );
};

const mapStateToProps = state => ({
  name: authSelectors.getUserName(state),
  avatar:
    'https://icon-library.net/images/avatar-icon-images/avatar-icon-images-7.jpg',
});

export default connect(mapStateToProps, { onLogout: authOperations.logOut })(
  withThemeContext(UserMenu),
);
