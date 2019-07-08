/**
 * VerticalTodayLine.jsx
 * Created by Jonathan Hill 07/05/19
 **/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

const propTypes = {
    xScale: PropTypes.func, // function to set line position
    text: PropTypes.string, // text to display with line
    y1: PropTypes.number, // top of graph
    y2: PropTypes.number, // bottom of graph
    xMax: PropTypes.number, // max possible value of x
    xMin: PropTypes.number, // max possible value of x
    xValue: PropTypes.number, // actual value of x
    showTextRight: PropTypes.bool, // show text to the right of line
    showTextleft: PropTypes.bool, // show text to the left of line
    textY: PropTypes.number, // show text at this height
    description: PropTypes.string
};

export default class VerticalTodayLine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textX: 0,
            textY: props.textY,
            windowWidth: null
        };
        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.textDiv = null;
        // React will call this function when the DOM draws it ( React Callback Refs )
        this.setTextDiv = element => {
            this.textDiv = element;
            this.positionText();
        };
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }
    // since we set the position of the text we need to update it on window resize
    handleWindowResize() {
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            this.setState({ windowWidth });
            this.positionText();
        }
    }

    description() {
        return this.props.description || 'A vertical line representing today\'s date';
    }

    positionLine() {
        return this.props.xScale(this.props.xValue || Date.now());
    }

    positionText() {
        const {
            xScale,
            xValue,
            showTextRight,
            showTextLeft,
            textY
        } = this.props;
        let positionX = xScale(xValue || Date.now());
        // the text div starts null since React only calls the callback ref function
        // when the DOM draws the element, without this you will get an error since
        // we will be call properties on null
        if (this.textDiv) {
            const textDivDimensions = this.textDiv.getBoundingClientRect();
            const width = textDivDimensions.width;
            if (showTextLeft) positionX -= (width + 4);
            if (showTextRight) positionX += 4;
        }
        this.setState({ textX: positionX, textY });
    }

    render() {
        const {
            text,
            y1,
            y2,
            xValue,
            xMax,
            xMin
        } = this.props;
        // show nothing if not within x Range
        if ((xValue > xMax) && (xValue < xMin)) return null;
        const linePosition = this.positionLine();
        return (
            <g className="vertical-today-line__container">
                <desc>{this.description}</desc>
                <text
                    id="vertical-today-line__text"
                    x={this.state.textX}
                    y={this.state.textY}
                    ref={this.setTextDiv}>
                    {text || 'Today'}
                </text>
                <line
                    id="vertical-today-line"
                    x1={linePosition}
                    x2={linePosition}
                    y1={y1}
                    y2={y2} />
            </g>
        );
    }
}

VerticalTodayLine.propTypes = propTypes;
