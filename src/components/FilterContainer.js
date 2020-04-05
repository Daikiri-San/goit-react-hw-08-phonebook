import React, { Component } from 'react';
import { connect } from 'react-redux';
import contactsActions from '../redux/contacts/contactsActions';
import contactsSelectors from '../redux/contacts/contactsSelectors';
import withThemeContext from './hoc/withTheme';
import Filter from './Filter';

class FilterContainer extends Component {
  state = {
    appear: false,
  };

  componentDidMount() {
    const { contacts } = this.props;
    if (contacts.length <= 1) {
      return;
    }
    this.setState({
      appear: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.contacts.length !== this.props.contacts.length) {
      const { contacts } = this.props;
      if (contacts.length > 1) {
        return this.toAppear();
      }
      if (contacts.length <= 1) {
        return this.toUnAppear();
      }
    }
  }

  toAppear = () => {
    this.setState({
      appear: true,
    });
  };

  toUnAppear = () => {
    this.setState({
      appear: false,
    });
  };

  render() {
    const { appear } = this.state;
    return <Filter {...this.props} appear={appear} />;
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onChangeFilter: str => dispatch(filterActions.changeFilter(str)),
//   };
// };

const mapStateToProps = state => {
  return {
    contacts: contactsSelectors.getContacts(state),
  };
};

const mapDispatchToProps = {
  onChangeFilter: contactsActions.changeFilter,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withThemeContext(FilterContainer));
