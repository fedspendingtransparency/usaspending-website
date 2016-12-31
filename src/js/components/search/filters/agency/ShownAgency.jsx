/**
 * ShownAgency.jsx
 * Created by Emily Gullo 12/28/2016
 **/

import React from 'react';

const propTypes = {
    removeAgency: React.PropTypes.func,
    label: React.PropTypes.string,
    agencyType: React.PropTypes.string
};

export default class ShownAgency extends React.Component {

    render() {
        return (
            <button
                className="shown-agency-button"
                value={this.props.label}
                onClick={this.props.removeAgency}>
                {this.props.label} | {this.props.agencyType} <span className="close">x</span>
            </button>
        );
    }
}
ShownAgency.propTypes = propTypes;
