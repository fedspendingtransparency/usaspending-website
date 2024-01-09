/**
 * SelectedRecipients.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ShownRecipient from './ShownRecipient';

const propTypes = {
    selectedRecipients: PropTypes.object,
    toggleRecipient: PropTypes.func
};

const SelectedRecipients = ({ selectedRecipients, toggleRecipient }) => {
    const shownRecipients = [];
    selectedRecipients.forEach((recipient) => {
        const value = (
            <ShownRecipient
                recipient={recipient}
                label={`RECIPIENT | ${recipient}`}
                key={recipient}
                toggleRecipient={toggleRecipient.bind(null, recipient)} />
        );
        shownRecipients.push(value);
    });

    return (
        <div
            className="selected-filters"
            role="status">
            {shownRecipients}
        </div>
    );
};

SelectedRecipients.propTypes = propTypes;
export default SelectedRecipients;
