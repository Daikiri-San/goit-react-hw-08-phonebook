import { connect } from 'react-redux';
import withThemeContext from '../hoc/withTheme';
import contactsOperations from '../../redux/contacts/contactsOperations';
import contactsSelectors from '../../redux/contacts/contactsSelectors';
import ListItem from './ListItem';

const mapStateToProps = (state, ownProps) => ({
  ...contactsSelectors.getTaskById(state, ownProps.id),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRemoveContact: () =>
      dispatch(contactsOperations.removeContact(ownProps.id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withThemeContext(ListItem));
