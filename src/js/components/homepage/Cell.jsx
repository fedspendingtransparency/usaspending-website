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

    // wrap(text) {
    //     const width = 40;
    //     const y = 0;
    //     const words = text.split(' ');
    //     let wrapped = '';
    //     const line = text;
    //
    //     for (let n = 0; n < words.length; n++) {
    //         const newLine = ` ${words[n]} `;
    //
    //         const lineWidth = text.length;
    //
    //         if (lineWidth > width && n > 0) {
    //             wrapped += `<tspan x="0" dy=${y + 20}>${newLine}</tspan>`;
    //         }
    //     }
    //     let final = line;
    //     if (wrapped !== '') {
    //         final = wrapped;
    //     }
    //     return final;
    // }

    render() {
        const n = this.props.n;
        const i = this.props.i;
        return (
            <g
                transform={`translate(${n.x0},${n.y0})`}>
                <rect
                    className="tile"
                    id={i}
                    width={n.x1 - n.x0}
                    height={n.y1 - n.y0}
                    style={{
                        fill: this.props.color
                    }} />
                <text
                    className="category"
                    x={((n.x1 - n.x0) / 2) - 30}
                    y={(n.y1 - n.y0) / 2}>
                    {this.wrap(n.data.name)}
                </text>
                <text
                    className="value"
                    x={((n.x1 - n.x0) / 2) - 20}
                    y={((n.y1 - n.y0) / 2) + 20}>
                    {Math.round((n.value / n.parent.value) * 100)}%
                </text>
            </g>
        );
    }
}
Cell.propTypes = propTypes;
