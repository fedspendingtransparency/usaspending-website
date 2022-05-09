/**
 * ShownRecipient.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    toggleRecipient: PropTypes.func,
    label: PropTypes.string
};

export default class ShownRecipient extends React.Component {
    render() {
        return (
            <button
                className="shown-filter-button"
                value={this.props.label}
                onClick={this.props.toggleRecipient}
                title="Click to remove filter."
                aria-label={`Applied filter: ${this.props.label}`}>
                {this.props.label}
                <span className="close">
                    <FontAwesomeIcon icon="times" />
                </span>
            </button>
        );
    }
}

ShownRecipient.propTypes = propTypes;
