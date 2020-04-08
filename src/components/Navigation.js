import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import withThemeContext from './hoc/withTheme';
import { authSelectors } from '../redux/auth';
import ThemeSwitcher from './ThemeSwitcher';
import routes from '../routes';

const Nav = styled.nav`
  width: 100%;
  padding: 2rem 4rem;
  display: flex;
  justify-content: flex-start;
`;

const LinkContainer = styled.div`
  justify-self: flex-end;
`;

const NavItem = styled(NavLink).attrs(props => ({
  activeClassName: props.activeClassName || 'activeLink',
  activeStyle: {
    color: 'tomato',
  },
}))`
  font-size: 2.6rem;
  font-family: 'Philosopher', sans-serif;
  font-weight: 500;
  text-decoration: none;
  color: ${props => props.color};
  transition: color 0.2s linear;

  &:not(:first-of-type) {
    margin-left: 2rem;
  }

  &:hover {
    color: #4a70f7;
  }
`;

function Navigation({ theme, isAuthenticated }) {
  const forAll = routes.filter(route => !route.private && !route.restricted);
  const publicOnly = routes.filter(route => !route.private && route.restricted);
  const privateOnly = routes.filter(route => route.private);
  return (
    <Nav>
      {forAll.map(route => (
        <NavItem
          exact={route.exact}
          key={route.label}
          to={route.path}
          color={theme.config.messageColor}
        >
          {route.label}
        </NavItem>
      ))}
      {isAuthenticated &&
        privateOnly.map(route => (
          <NavItem
            exact={route.exact}
            key={route.label}
            to={route.path}
            color={theme.config.messageColor}
          >
            {route.label}
          </NavItem>
        ))}
      <ThemeSwitcher />
      {!isAuthenticated && (
        <LinkContainer>
          {publicOnly.map(route => (
            <NavItem
              exact={route.exact}
              key={route.label}
              to={route.path}
              color={theme.config.messageColor}
            >
              {route.label}
            </NavItem>
          ))}
        </LinkContainer>
      )}
    </Nav>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
});

export default connect(mapStateToProps)(withThemeContext(Navigation));
