/**
 * RecipientNameDUNSContainer.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecipientName from 'components/search/filters/recipient/RecipientName';

const propTypes = {
    toggleRecipient: PropTypes.func,
    selectedRecipients: PropTypes.object
};

export class RecipientNameDUNSContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipientSearchString: '',
            showWarning: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.searchRecipient = this.searchRecipient.bind(this);
    }

    searchRecipient() {
        const searchString = this.state.recipientSearchString;

        // Only search if input is 3 or more characters and is not already
        // in the list of results
        if (searchString.length >= 3 && !this.props.selectedRecipients.has(searchString)) {
            this.props.toggleRecipient(searchString);

            // Reset input
            this.setState({
                recipientSearchString: ''
            });
        }
        else {
            this.setState({
                showWarning: true
            });
        }
    }

    handleTextInput(recipientInput) {
    // Save input and clear any errors
        this.setState({
            recipientSearchString: recipientInput.target.value,
            showWarning: false
        });
    }

    render() {
        return (
            <RecipientName
                changedInput={this.handleTextInput}
                searchRecipient={this.searchRecipient}
                value={this.state.recipientSearchString}
                showWarning={this.state.showWarning}
                selectedRecipients={this.props.selectedRecipients} />
        );
    }
}

export default connect(
    (state) => ({
        selectedRecipients: state.filters.selectedRecipients
    })
)(RecipientNameDUNSContainer);

RecipientNameDUNSContainer.propTypes = propTypes;
