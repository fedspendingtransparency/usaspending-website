/**
 * HorizontalYAxis.jsx
 * Created by Kevin Li 2/7/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    xScale: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number,
    height: PropTypes.number
};

export default class HorizontalYAxis extends React.Component {
    render() {
        let zeroPos = 0;
        if (this.props.xScale) {
            zeroPos = this.props.xScale(0);
        }

        return (
            <g
                className="bar-axis"
                transform={`translate(${this.props.x},${this.props.y})`}>
                <line
                    className="y-axis"
                    x1={zeroPos}
                    x2={zeroPos}
                    y1={-1 * this.props.height}
                    y2={0} />
            </g>
        );
    }
}

HorizontalYAxis.propTypes = propTypes;
