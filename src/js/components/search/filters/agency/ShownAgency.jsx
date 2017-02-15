/**
 * ShownAgency.jsx
 * Created by Emily Gullo 12/28/2016
 **/

import React from 'react';

const propTypes = {
    agency: React.PropTypes.object,
    toggleAgency: React.PropTypes.func,
    label: React.PropTypes.string,
    agencyType: React.PropTypes.string
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
                className="shown-agency-button"
                value={this.props.label}
                onClick={this.toggleAgency}>
                {this.props.label} <span className="close">x</span>
            </button>
        );
    }
}
ShownAgency.propTypes = propTypes;
