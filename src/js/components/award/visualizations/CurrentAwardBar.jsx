/**
 * CurrentAwardBar.jsx
 * Created by Emily Gullo 02/13/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.string
};

export default class CurrentAwardBar extends React.Component {
    render() {
        return (
            <g aria-label={this.props.data} className="current">
                <desc>Current Award Amounts</desc>
                <rect
                    className="current-bar"
                    x={this.props.x}
                    y={this.props.y}
                    width={this.props.width}
                    height={this.props.height} />
            </g>
        );
    }
}
CurrentAwardBar.propTypes = propTypes;
