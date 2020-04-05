import React from 'react';
import styled from 'styled-components';
import withThemeContext from '../components/hoc/withTheme';

const Container = styled.div`
  margin: 0 auto;
  max-width: 70rem;
  text-align: center;
`;

const Greetings = styled.p`
  display: inline-block;
  margin-top: 5rem;
  font-size: 4rem;
  font-weight: 500;
  color: ${props => props.color};
`;

const HomePage = ({ theme }) => {
  return (
    <Container>
      <Greetings color={theme.config.messageColor}>
        Hi there! At this App you can create your own online Phonebook and use
        it! :)
      </Greetings>
    </Container>
  );
};

export default withThemeContext(HomePage);
