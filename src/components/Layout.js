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

const SwitchThemeItem = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 10rem;
  right: 2rem;
  padding-right: 2rem;
`;

const LabelOfSwitch = styled.span`
  position: relative;
  padding: 0px 10px;
  font-size: 2.6rem;
  font-weight: 500;
  color: ${props => props.color};
`;

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const Input = styled.input`
  display: none;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + & {
    background-color: #2196f3;
  }

  input:focus + & {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + &:before {
    transform: translateX(26px);
  }
`;

const Layout = ({ children, theme, hasError, isLoading }) => (
  <Background color={theme.config.mainBGColor}>
    {isLoading && <Spinner />}
    {hasError && <Notification message={hasError} apearNotice={true} />}
    <AppBar />
    <SwitchThemeItem>
      <LabelOfSwitch color={theme.config.contentColor}>
        Theme: {theme.theme === 'light' ? 'Light' : 'Dark'}
      </LabelOfSwitch>
      <Label>
        <Input
          type="checkbox"
          checked={theme.theme === 'light'}
          onChange={theme.toggleTheme}
        />
        <Slider />
      </Label>
    </SwitchThemeItem>
    <Container>{children}</Container>
  </Background>
);

const mapStateToProps = state => ({
  hasError: authSelectors.getError(state),
  isLoading: authSelectors.getLoading(state),
});
export default connect(mapStateToProps)(withThemeContext(Layout));
