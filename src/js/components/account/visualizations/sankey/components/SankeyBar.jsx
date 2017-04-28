/**
 * SankeyBar.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';

const propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    description: React.PropTypes.string,
    color: React.PropTypes.string
};

const defaultProps = {
    description: ''
};

export default class SankeyBar extends React.Component {
    render() {
        if (this.props.height <= 0) {
            // don't display anything if there's no value
            return null;
        }
        else if (this.props.width <= 0) {
            return null;
        }

        return (
            <g
                transform={`translate(${this.props.x},${this.props.y})`}
                aria-label={this.props.description}>
                <desc>{this.props.description}</desc>
                <rect
                    fill={this.props.color}
                    x="0"
                    y="0"
                    width={this.props.width}
                    height={this.props.height} />
            </g>
        );
    }
}

SankeyBar.propTypes = propTypes;
SankeyBar.defaultProps = defaultProps;
