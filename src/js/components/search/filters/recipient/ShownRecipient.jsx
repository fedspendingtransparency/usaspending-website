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
                className="shown-filter-button"
                value={this.props.label}
                onClick={this.props.toggleRecipient}>
                <span className="close">x</span> {this.props.label}
            </button>
        );
    }
}

ShownRecipient.propTypes = propTypes;
