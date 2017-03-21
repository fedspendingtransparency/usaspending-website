/**
 * TreeMap.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';

const propTypes = {
    n: React.PropTypes.object,
    i: React.PropTypes.number,
    color: React.PropTypes.string
};

export default class Cell extends React.Component {

    render() {
        const n = this.props.n;
        const i = this.props.i;
        return (
            <g transform={`translate(${n.x0},${n.y0})`}>
                <rect
                    id={i}
                    width={n.x1 - n.x0}
                    height={n.y1 - n.y0}
                    style={{
                        fill: this.props.color,
                        stroke: "white",
                        strokeWidth: "1.5px"
                    }} />
                <text
                    x={((n.x1 - n.x0) / 2) - 20}
                    y={(n.y1 - n.y0) / 2}
                    fontSize="10px"
                    fill="white">
                    {n.data.name}
                </text>
                <text
                    x={((n.x1 - n.x0) / 2) - 20}
                    y={((n.y1 - n.y0) / 2) + 20}
                    fontSize="13px"
                    fill="white">
                    {Math.round((n.value / n.parent.value) * 100)}%
                </text>
            </g>
        );
    }
}
Cell.propTypes = propTypes;
