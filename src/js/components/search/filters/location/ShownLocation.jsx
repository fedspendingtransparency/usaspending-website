/**
 * ShownLocation.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';

const propTypes = {
    removeLocation: React.PropTypes.func,
    label: React.PropTypes.string
};

export default class ShownLocation extends React.Component {

    render() {
        return (
            <button
                className="shown-location-button"
                value={this.props.label}
                onClick={this.props.removeLocation}>
                <span className="close">x</span> {this.props.label}
            </button>
        );
    }
}
ShownLocation.propTypes = propTypes;
