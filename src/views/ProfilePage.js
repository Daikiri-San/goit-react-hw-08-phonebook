import React from 'react';
import styled from 'styled-components';
import Profile from '../components/Profile';
import Header from '../components/Header';

const Container = styled.div`
  margin: 0 auto;
  max-width: 30rem;
`;

const ProfilePage = () => {
  return (
    <Container>
      <Header text={'Profile'} />
      <Profile />
    </Container>
  );
};

export default ProfilePage;
