import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import withThemeContext from './hoc/withTheme';
import { authSelectors } from '../redux/auth';
import UserMenu from './UserMenu';
import Navigation from './Navigation';

const Header = styled.header`
  width: 100%;
  box-shadow: ${props => props.shadow};
  background: ${props => props.backgroundColor};
  margin-bottom: 2rem;
  display: flex;

  @media screen and (min-width: 30em) {
    margin-bottom: 3rem;
  }

  @media screen and (min-width: 48em) {
    margin-bottom: 4rem;
  }

  @media screen and (min-width: 64em) {
    margin-bottom: 6rem;
  }
`;

const Appbar = ({ theme, isAuthenticated, isLoading }) => (
  <Header
    shadow={theme.config.mainShadowBox}
    backgroundColor={theme.config.headerBGColor}
  >
    <Navigation />
    {isAuthenticated && !isLoading && <UserMenu />}
  </Header>
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
  isLoading: authSelectors.getLoading(state),
});

export default connect(mapStateToProps)(withThemeContext(Appbar));
