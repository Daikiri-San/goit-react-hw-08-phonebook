import React from 'react';
import styled from 'styled-components';
import withThemeContext from './hoc/withTheme';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const SwitchThemeItem = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const LabelOfSwitch = styled.span`
  position: relative;
  padding: 0px 10px;
  font-size: 2.4rem;
  font-weight: 500;
  color: ${props => props.color};
`;

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 5rem;
  height: 3rem;
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
    height: 2.2rem;
    width: 2.2rem;
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
    transform: translateX(2rem);
  }
`;

const ThemeSwitcher = ({ theme }) => (
  <SwitchThemeItem>
    <LabelOfSwitch color={theme.config.contentColor}>
      Theme:{' '}
      {theme.theme === 'light' ? (
        <Brightness5Icon color="primary" fontSize="large" />
      ) : (
        <Brightness4Icon color="secondary" fontSize="large" />
      )}
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
);

export default withThemeContext(ThemeSwitcher);
