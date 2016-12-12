/**
 * ShownLocation.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';

const propTypes = {
    value: React.PropTypes.string
};

export default class ShownLocation extends React.Component {

    render() {
        return (
            <button
                className="shown-location-button"
                value={this.props.value}>
                {this.props.value}
            </button>
        );
    }
}
ShownLocation.propTypes = propTypes;
