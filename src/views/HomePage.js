import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import withThemeContext from '../components/hoc/withTheme';
import { Link } from 'react-router-dom';
import { authSelectors } from '../redux/auth';
import routesPaths from '../routesPaths';

const Container = styled.div`
  margin: 0 auto;
  max-width: 70rem;
  text-align: center;
`;

const Greetings = styled.p`
  display: inline-block;
  font-family: 'Philosopher', sans-serif;
  font-size: 4rem;
  color: ${props => props.color};

  &:first-of-type {
    margin-top: 5rem;
  }
`;

const MyLink = styled(Link)`
  color: ${props => props.color};
  transition: color 0.2s linear;

  &:hover,
  &:focus {
    color: tomato;
  }

  &:active {
    color: red;
  }
`;

const HomePage = ({ theme, isAuthenticated }) => (
  <Container>
    <Greetings color={theme.config.messageColor}>
      Hi there! At this App you can create your own online Phonebook and use it!
      :) To begin you need to click
    </Greetings>
    {isAuthenticated ? (
      <Greetings color={theme.config.messageColor}>
        {' '}
        <MyLink to={routesPaths.contacts} color={theme.config.linkColor}>
          Contacts
        </MyLink>{' '}
        and start using it!
      </Greetings>
    ) : (
      <Greetings color={theme.config.messageColor}>
        {' '}
        <MyLink to={routesPaths.register} color={theme.config.linkColor}>
          Sign up
        </MyLink>{' '}
        or{' '}
        <MyLink to={routesPaths.login} color={theme.config.linkColor}>
          Login
        </MyLink>
      </Greetings>
    )}
  </Container>
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
});

export default connect(mapStateToProps)(withThemeContext(HomePage));

// , { onLogout: authOperations.logOut }
