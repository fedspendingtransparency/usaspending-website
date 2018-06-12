/**
 * ShownLocation.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

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
                <span className="close">
                    <Icons.Close className="usa-da-icon-close" alt="Close icon" />
                </span> {this.props.label}
            </button>
        );
    }
}
ShownLocation.propTypes = propTypes;
