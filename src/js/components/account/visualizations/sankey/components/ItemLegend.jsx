/**
 * ItemLegend.jsx
 * Created by Kevin Li 3/28/17
 */

import React from 'react';

const propTypes = {
    color: React.PropTypes.string,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    hide: React.PropTypes.bool,
    title: React.PropTypes.string,
    value: React.PropTypes.string
};

const defaultProps = {
    color: '#000000',
    x: 0,
    y: 0,
    hide: false
};

export default class ItemLegend extends React.Component {
    render() {
        if (this.props.hide) {
            return null;
        }

        return (
            <g
                className="item-label"
                transform={`translate(${this.props.x},${this.props.y})`}>
                <circle r="5" fill={this.props.color} />
                <text
                    className="title"
                    x={20}
                    y={0}>
                    {this.props.title}
                </text>
                <text
                    className="value"
                    x={20}
                    y={16}>
                    {this.props.value}
                </text>
            </g>
        );
    }
}

ItemLegend.propTypes = propTypes;
ItemLegend.defaultProps = defaultProps;
