import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
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
  font-size: 2rem;
  font-weight: 700;
  margin-right: 1.2rem;
  color: ${props => props.color};
`;

const UserMenu = ({ avatar, name, onLogout, theme }) => (
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

const mapStateToProps = state => ({
  name: authSelectors.getUserName(state),
  avatar:
    'https://icon-library.net/images/avatar-icon-images/avatar-icon-images-7.jpg',
});

export default connect(mapStateToProps, { onLogout: authOperations.logOut })(
  withThemeContext(UserMenu),
);
