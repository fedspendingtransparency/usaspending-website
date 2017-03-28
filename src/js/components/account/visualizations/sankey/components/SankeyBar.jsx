/**
 * SankeyBar.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';

const defaultProps = {
    description: ''
};

export default class SankeyBar extends React.Component {
    render() {
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

SankeyBar.defaultProps = defaultProps;
