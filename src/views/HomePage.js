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

const Button = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.8rem;
  margin-left: auto;
  margin-top: 4rem;
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

const HomePage = ({ theme, isAuthenticated }) => {
  const reboot = () => {
    window.localStorage.clear();
    window.location.reload();
  };
  return (
    <Container>
      <Greetings color={theme.config.messageColor}>
        Hi there! At this App you can create your own online Phonebook and use
        it! :) To begin you need to click
      </Greetings>
      {isAuthenticated ? (
        <Greetings>
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
      <Button onClick={reboot}>Full Reboot Page</Button>
    </Container>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
});

export default connect(mapStateToProps)(withThemeContext(HomePage));

// , { onLogout: authOperations.logOut }
