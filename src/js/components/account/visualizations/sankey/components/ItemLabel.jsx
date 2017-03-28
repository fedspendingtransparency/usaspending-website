/**
 * ItemLabel.jsx
 * Created by Kevin Li 3/28/17
 */

import React from 'react';

const defaultProps = {
    x: 0,
    y: 0
};

export default class ItemLabel extends React.Component {
    render() {
        return (
            <g
                className="item-label"
                transform={`translate(${this.props.x},${this.props.y})`}>
                <text
                    className="title"
                    x={0}
                    y={0}>
                    {this.props.title}
                </text>
                <text
                    className="value"
                    x={0}
                    y={16}>
                    {this.props.value}
                </text>
            </g>
        );
    }
}

ItemLabel.defaultProps = defaultProps;
