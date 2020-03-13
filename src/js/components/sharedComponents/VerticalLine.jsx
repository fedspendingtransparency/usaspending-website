/**
 * VerticalLine.jsx
 * Created by Jonathan Hill 07/05/19
 **/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

const propTypes = {
    xScale: PropTypes.func, // function to set line position
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]), // text to display with line
    y1: PropTypes.number, // top of graph
    y2: PropTypes.number, // bottom of graph
    xMax: PropTypes.number, // max possible value of x
    xMin: PropTypes.number, // max possible value of x
    xValue: PropTypes.number, // actual value of x
    showTextPosition: PropTypes.string, // show text left, right, and top are valid
    textY: PropTypes.number, // show text at this height
    description: PropTypes.string,
    adjustmentX: PropTypes.number, // adjust x for padding
    textClassname: PropTypes.string,
    lineClassname: PropTypes.string
};

export default class VerticalLine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textX: 0,
            textY: props.textY,
            windowWidth: null
        };
        // this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.textDiv = null;
        // React will call this function when the DOM draws it ( React Callback Refs )
        this.setTextDiv = (element) => {
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
    handleWindowResize = throttle(() => {
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            this.setState({ windowWidth });
            this.positionText();
        }
    })

    positionText = () => {
        const {
            xScale,
            xValue,
            showTextPosition,
            textY,
            adjustmentX
        } = this.props;
        let positionX = xScale(xValue || Date.now()) + (adjustmentX || 0);
        let modifiedTextY = textY;
        // the text div starts null since React only calls the callback ref function
        // when the DOM draws the element, without this you will get an error since
        // we will be call properties on null
        if (this.textDiv) {
            const isSecondWord = this.textDiv.getAttributeNames().includes('data-second');
            const textDivDimensions = this.textDiv.getBoundingClientRect();
            const width = textDivDimensions.width;
            if (showTextPosition === 'left') positionX -= (width + 4);
            if (showTextPosition === 'right') positionX += 4;
            if (showTextPosition === 'top') {
                modifiedTextY -= 15;
                positionX -= (width / 2);
            }
            if (isSecondWord) {
                modifiedTextY += textDivDimensions.height;
            }
        }
        this.setState({ textX: positionX, textY: modifiedTextY });
    }

    verticalLine = () => {
        const {
            xMin,
            xMax,
            xValue,
            xScale,
            adjustmentX,
            y1,
            y2,
            lineClassname
        } = this.props;
        const linePosition = xScale(xValue) + (adjustmentX || 0);
        // get x position of minimum
        const minimumX = xScale(xMin);
        // get x position of maximum
        const maximumX = xScale(xMax) + (adjustmentX || 0);
        if ((linePosition > maximumX) || (linePosition < minimumX)) return null;
        return (
            <line
                className={lineClassname || "vertical-line"}
                x1={linePosition}
                x2={linePosition}
                y1={y1}
                y2={y2} />
        );
    }

    text = (lineIsDisplayed) => {
        const { text, textClassname } = this.props;
        if (!lineIsDisplayed || !text) return null;
        if (Array.isArray(text)) {
            return text.map((data, i) => {
                const isSecondWord = i > 0;
                return (
                    <text
                        className={textClassname || "vertical-line__text"}
                        x={this.state.textX}
                        y={this.state.textY}
                        ref={this.setTextDiv}
                        data-second={isSecondWord}>
                        {text}
                    </text>
                );
            });
        }
        return (
            <text
                className={textClassname || "vertical-line__text"}
                x={this.state.textX}
                y={this.state.textY}
                ref={this.setTextDiv}>
                {text}
            </text>
        );
    }

    render() {
        // show nothing if not within x Range
        const verticalLine = this.verticalLine();
        const text = this.text(verticalLine);
        const description = this.props.description || 'A vertical line representing today\'s date';
        return (
            <g className="vertical-line__container">
                <desc>{description}</desc>
                {text}
                {verticalLine}
            </g>
        );
    }
}

VerticalLine.propTypes = propTypes;
