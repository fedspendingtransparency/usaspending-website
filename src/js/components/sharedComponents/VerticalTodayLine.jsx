/**
 * VerticalTodayLine.jsx
 * Created by Jonathan Hill 07/05/19
 **/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    xScale: PropTypes.func,
    text: PropTypes.string,
    y1: PropTypes.number,
    y2: PropTypes.number,
    xMax: PropTypes.number,
    xMin: PropTypes.number,
    padding: PropTypes.number,
    usePadding: PropTypes.bool,
    xPosition: PropTypes.number
};

export default class VerticalTodayLine extends Component {
    description() {
        return 'A vertical line representing today\'s date';
    }

    xValues() {
        const {
            xScale,
            xPosition,
            padding,
            usePadding
        } = this.props;
        let position = xScale(xPosition || Date.now());
        // TODO: Would eventually like to move away from this
        // would like to use the padding in the scale so we
        // dont have to do this
        if (usePadding) position += padding;
        return {
            position
        };
    }

    render() {
        const {
            text,
            y1,
            y2,
            xPosition,
            xMax,
            xMin
        } = this.props;
        // show nothing if not within x Range
        if ((xPosition > xMax) && (xPosition < xMin)) return null;
        const { position } = this.xValues();
        return (
            <g id="vertical-today-line__container">
                <desc>{this.description}</desc>
                <text
                    x={position}>
                    {text || 'Today'}
                </text>
                <line
                    id="vertical-today-line"
                    x1={position}
                    x2={position}
                    y1={y1}
                    y2={y2} />
            </g>
        );
    }
}

VerticalTodayLine.propTypes = propTypes;
