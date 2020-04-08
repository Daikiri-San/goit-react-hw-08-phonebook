import React, { Component } from 'react';
import { connect } from 'react-redux';
import contactsOperations from '../redux/contacts/contactsOperations';
import contactsSelectors from '../redux/contacts/contactsSelectors';
import Spinner from '../components/Spinner';
import ContactForm from '../components/ContactFormContainer';
import ContactList from '../components/ContactList/ContactListContainer';
import Filter from '../components/FilterContainer';

class ContactsPage extends Component {
  componentDidMount() {
    const { onFetchExistContacts } = this.props;
    return onFetchExistContacts();
  }

  render() {
    const { isLoadingContacts } = this.props;
    return (
      <>
        {isLoadingContacts && <Spinner />}
        <ContactForm />
        <Filter />
        <ContactList />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoadingContacts: contactsSelectors.getLoading(state),
  };
};

const mapDispatchToProps = {
  onFetchExistContacts: contactsOperations.fetchExistContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
