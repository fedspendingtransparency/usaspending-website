/**
 * ShownAgency.jsx
 * Created by Emily Gullo 12/28/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    agency: PropTypes.object,
    toggleAgency: PropTypes.func,
    label: PropTypes.string,
    agencyType: PropTypes.string
};

export default class ShownAgency extends React.Component {
    constructor(props) {
        super(props);

        this.toggleAgency = this.toggleAgency.bind(this);
    }

    toggleAgency() {
        this.props.toggleAgency(this.props.agency, true, this.props.agencyType);
    }

    render() {
        return (
            <button
                className="shown-filter-button"
                value={this.props.label}
                onClick={this.toggleAgency}
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
ShownAgency.propTypes = propTypes;
