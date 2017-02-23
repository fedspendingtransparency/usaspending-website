/**
 * ShownRecipient.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';

const propTypes = {
    toggleRecipient: React.PropTypes.func,
    label: React.PropTypes.string
};

export default class ShownRecipient extends React.Component {

    render() {
        return (
            <button
                className="shown-recipient-button"
                value={this.props.label}
                onClick={this.props.toggleRecipient}>
                {this.props.label} <span className="close">x</span>
            </button>
        );
    }
}

ShownRecipient.propTypes = propTypes;
