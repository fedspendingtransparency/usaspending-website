/**
 * ShownLocation.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    removeLocation: PropTypes.func,
    label: PropTypes.string
};

export default class ShownLocation extends React.Component {
    render() {
        return (
            <button
                className="shown-filter-button"
                value={this.props.label}
                onClick={this.props.removeLocation}
                title="Click to remove."
                aria-label={`Applied filter: ${this.props.label}`}>
                {this.props.label}
                <span className="close">
                    <FontAwesomeIcon icon="times" />
                </span>
            </button>
        );
    }
}
ShownLocation.propTypes = propTypes;
