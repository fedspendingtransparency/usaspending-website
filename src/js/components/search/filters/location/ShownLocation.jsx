/**
 * ShownLocation.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';

const propTypes = {
    value: React.PropTypes.string,
    removeLocation: React.PropTypes.func
};

export default class ShownLocation extends React.Component {

    render() {
        return (
            <button
                className="shown-location-button"
                value={this.props.value}
                onClick={this.props.removeLocation}>
                {this.props.value} <span className="close">x</span>
            </button>
        );
    }
}
ShownLocation.propTypes = propTypes;
