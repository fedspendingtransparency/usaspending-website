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

export default class SelectedRecipients extends React.Component {
    render() {
        const shownRecipients = [];
        this.props.selectedRecipients.entrySeq().forEach((entry) => {
            const key = entry[0];
            const recipient = entry[1];
            const value = (<ShownRecipient
                recipient={recipient}
                label={`${recipient.recipient_name} | ${recipient.recipient_unique_id}`}
                key={key}
                toggleRecipient={this.props.toggleRecipient.bind(null, recipient)} />);
            shownRecipients.push(value);
        });

        return (
            <div className="selected-filters">
                {shownRecipients}
            </div>
        );
    }
}

SelectedRecipients.propTypes = propTypes;
