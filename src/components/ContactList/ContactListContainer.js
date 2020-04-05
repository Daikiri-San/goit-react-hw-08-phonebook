import { connect } from 'react-redux';
import contactsSelectors from '../../redux/contacts/contactsSelectors';
import ContactList from './ContactList';

const mapStateToProps = state => ({
  contacts: contactsSelectors.getContacts(state),
  visibleContacts: contactsSelectors.getVisibleContacts(state),
});
export default connect(mapStateToProps)(ContactList);
