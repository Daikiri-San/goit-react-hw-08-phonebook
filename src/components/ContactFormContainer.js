import React, { Component } from 'react';
import { connect } from 'react-redux';
import withThemeContext from './hoc/withTheme';
import ContactsOperations from '../redux/contacts/contactsOperations';
import contactsSelectors from '../redux/contacts/contactsSelectors';
import ContactForm from './ContactForm';

class ContactFormContainer extends Component {
  state = {
    apearNotice: false,
    notice: null,
  };

  addContact = (name, number) => {
    const { contacts, onAddContact } = this.props;
    const checkedForName = contacts.find(contact => name === contact.name);
    if (checkedForName) {
      this.setState({
        notice: `${name} is already in contacts`,
        apearNotice: true,
      });

      return setTimeout(
        () =>
          this.setState({
            apearNotice: false,
          }),
        2400,
      );
    }
    const numberCheck = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;
    const checkedNumber = numberCheck.test(number);
    if (!checkedNumber) {
      this.setState({
        notice: 'Hey! This is not a real number :)',
        apearNotice: true,
      });
      return setTimeout(
        () =>
          this.setState({
            apearNotice: false,
          }),
        2400,
      );
    }
    const newContact = {
      name,
      number,
    };
    onAddContact(newContact);
  };
  render() {
    return (
      <ContactForm
        {...this.props}
        addContact={this.addContact}
        apearNotice={this.state.apearNotice}
        notice={this.state.notice}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: contactsSelectors.getContacts(state),
    hasError: contactsSelectors.getError(state),
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddContact: obj => dispatch(ContactsActions.addContact(obj)),
//   };
// };

const mapDispatchToProps = {
  onAddContact: ContactsOperations.addContact,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withThemeContext(ContactFormContainer));
