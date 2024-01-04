/**
 * RecipientNameDUNSContainer.jsx
 * Created by michaelbray on 2/17/17.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecipientName from 'components/search/filters/recipient/RecipientName';

const propTypes = {
    toggleRecipient: PropTypes.func,
    selectedRecipients: PropTypes.object
};

const RecipientNameDUNSContainer = (props) => {
    const [recipientSearchString, setRecipientSearchString] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    const searchRecipient = () => {
        const searchString = recipientSearchString;

        // Only search if input is 3 or more characters and is not already
        // in the list of results
        if (searchString.length >= 3 && !props.selectedRecipients.has(searchString)) {
            props.toggleRecipient(searchString);

            // Reset input
            setRecipientSearchString('');
        }
        else {
            setShowWarning(true);
        }
    };

    const handleTextInput = (recipientInput) => {
        // Save input and clear any errors
        setRecipientSearchString(recipientInput.target.value);
        setShowWarning(false);
    };

    return (
        <RecipientName
            changedInput={handleTextInput}
            searchRecipient={searchRecipient}
            value={recipientSearchString}
            showWarning={showWarning} />
    );
};

export default connect(
    (state) => ({
        selectedRecipients: state.filters.selectedRecipients
    })
)(RecipientNameDUNSContainer);

RecipientNameDUNSContainer.propTypes = propTypes;
