/**
 * OutlayItem.jsx
 * Created by Kevin Li 4/3/17
 */

import React from 'react';

const propTypes = {
    width: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    color: React.PropTypes.string
};

export default class OutlayItem extends React.Component {

    calculatePath() {
        let path = '';

        const startX = this.props.width + 5;
        // calculate the length of an equilateral triangle of with length 10px on each side
        const length = Math.sqrt(100 - 25);
        path = `${startX},0 ${startX + length},-5 ${startX + length}, 5`;

        return path;
    }

    render() {
        const trianglePath = this.calculatePath();
        return (
            <g
                className="outlay-group"
                transform={`translate(${this.props.x},${this.props.y})`}>

                <line
                    className="outlay-line"
                    x1={0}
                    y1={0}
                    x2={this.props.width}
                    y2={0}
                    strokeWidth="2"
                    stroke={this.props.color} />

                <polygon
                    className="outlay-triangle"
                    points={trianglePath}
                    fill={this.props.color} />

            </g>
        );
    }
}

OutlayItem.propTypes = propTypes;
