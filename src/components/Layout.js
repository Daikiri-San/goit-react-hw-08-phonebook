import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import withThemeContext from './hoc/withTheme';
import { authSelectors } from '../redux/auth';
import AppBar from './AppBar';
import Notification from './Notification';
import Spinner from './Spinner';

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.color};
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 56rem;
`;

const Layout = ({ children, theme, hasError, isLoading }) => (
  <Background color={theme.config.mainBGColor}>
    {isLoading && <Spinner />}
    {hasError && <Notification message={hasError} apearNotice={true} />}
    <AppBar />
    <Container>{children}</Container>
  </Background>
);

const mapStateToProps = state => ({
  hasError: authSelectors.getError(state),
  isLoading: authSelectors.getLoading(state),
});
export default connect(mapStateToProps)(withThemeContext(Layout));
