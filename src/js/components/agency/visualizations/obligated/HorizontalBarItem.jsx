/**
 * HorizontalBarItem.jsx
 * Created by Lizzie Salita 6/12/17
 */

import React from 'react';

const propTypes = {
    description: React.PropTypes.string,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    width: React.PropTypes.number,
    color: React.PropTypes.string
};

export default class HorizontalBarItem extends React.Component {
    render() {
        return (
            <g aria-label={this.props.description}>
                <desc>{this.props.description}</desc>
                <rect
                    className={`horizontal-bar-item`}
                    x={this.props.x}
                    y={this.props.y}
                    width={this.props.width}
                    height={20}
                    fill={this.props.color} />
            </g>
        );
    }
}

HorizontalBarItem.propTypes = propTypes;
