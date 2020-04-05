import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import slideTitleTransition from './transitions/slideTitle.module.css';
import withThemeContext from './hoc/withTheme';

const TitleContenet = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 2rem;
  color: ${props => props.color};
`;

function Header({ text, theme }) {
  return (
    <TitleContenet>
      <CSSTransition
        timeout={500}
        classNames={{ ...slideTitleTransition }}
        in={true}
        appear
      >
        <Title color={theme.config.contentColor}>{text}</Title>
      </CSSTransition>
    </TitleContenet>
  );
}

export default withThemeContext(Header);
