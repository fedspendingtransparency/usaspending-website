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
        this.props.selectedRecipients.forEach((recipient) => {
            const value = (
                <ShownRecipient
                    recipient={recipient}
                    label={`RECIPIENT | ${recipient}`}
                    key={recipient}
                    toggleRecipient={this.props.toggleRecipient.bind(null, recipient)} />
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
    }
}

SelectedRecipients.propTypes = propTypes;
