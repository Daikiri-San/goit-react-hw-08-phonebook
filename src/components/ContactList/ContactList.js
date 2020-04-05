import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TextNotification from '../TextNotification';
import ListItem from './ListItemContainer';
import slideItemTransition from '../transitions/slideItem.module.css';

const List = styled.ul`
  margin-bottom: 3rem;
`;

function ContactList({ contacts, visibleContacts, appear }) {
  return (
    <>
      <TransitionGroup component={List}>
        {visibleContacts.map(({ id }) => (
          <CSSTransition
            key={id}
            timeout={250}
            classNames={slideItemTransition}
            in={appear}
            unmountOnExit
          >
            <ListItem id={id} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      {contacts.length === 0 && (
        <TextNotification message={'You have no contacts. Add some :)'} />
      )}
      {contacts.length > 1 && visibleContacts.length === 0 && (
        <TextNotification message={'No contacts found :('} />
      )}
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
    PropTypes.array,
  ]),
};

export default ContactList;
