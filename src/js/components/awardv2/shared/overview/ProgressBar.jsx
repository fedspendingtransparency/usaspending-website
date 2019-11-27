/**
 * ProgressBar.jsx
 * Created by Jonathan Hill 11/26/19
 **/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { pull } from 'lodash';
import TwoRectangles from 'components/sharedComponents/patterns/TwoRectangles';

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    domain: PropTypes.array,
    thirdCircleData: PropTypes.number,
    currentProgress: PropTypes.number,
    progressText: PropTypes.string,
    awardType: PropTypes.string
};

// ProgressBar Workflow
// 1. width
// 2. validationOfProps
// 4. showTodayCircle?
// 4. showThirdCircle?
// 3. showTodayLine?
// 2. createXScales
// 5. createProgressBarProperties
// 6. updateBaseRectangleProperties
// 7. updateStartAndEndCircleProperties
// 8. updateProgressCircleProperties
// 9. updateThirdCircleProperties
// 1. updateProgressTextProperties
// 9. updateProgressLineProperties

export default class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visualizationHeight: 0,
            xScaleProgressBar: null,
            xScaleWithinCircles: null,
            progressWithinCirclesStartDomain: 0,
            progressWithinCirclesEndDomain: 0,
            domain: [],
            currentProgress: 0,
            thirdCircleData: 0,
            badDomainData: false,
            showProgressCircle: false,
            showProgressLine: false,
            progressText: '',
            showThirdCircle: false,
            styleForBaseRectangle: {},
            patternForBaseRectangle: null,
            baseRectangleProperties: {
                x: 0,
                y: 0,
                rx: 0,
                ry: 0,
                height: 0,
                width: 0
            },
            startCircleProperties: {
                cx: 0,
                cy: 0,
                r: 0
            },
            endCircleProperties: {
                cx: 0,
                cy: 0,
                r: 0
            },
            progressCircleProperties: {
                cx: 0,
                cy: 0,
                r: 0
            },
            thirdCircleProperties: {
                cx: 0,
                cy: 0,
                r: 0
            },
            progressTextProperties: {
                x: 0,
                y: 0
            },
            progressLineProperties: {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0
            }
        };
    }
    // recreate the progress bar on window resize
    componentDidUpdate(prevProps) {
        if (prevProps.width !== this.props.width) {
            this.start();
        }
    }
    // updates the width in state
    start = () => {
        this.validationOfProps();
    }
    // validity of domain, currentProgress, and thirdCircleData
    validationOfProps = () => {
        let {
            domain,
            currentProgress,
            thirdCircleData,
            progressText
        } = this.props;
        // validation of domain
        let badDomainData = false;
        pull(domain, null, undefined, '');
        if (domain.length !== 2) {
            domain = [0, 1];
            badDomainData = true;
        }
        // validation of current progress
        if (!currentProgress) currentProgress = null;
        // validation of third circle data
        if (!thirdCircleData) thirdCircleData = null;
        // validate text
        if (!progressText) progressText = '';
        this.setState({
            domain,
            currentProgress,
            thirdCircleData,
            badDomainData,
            progressText
        }, this.showProgressCircle);
    }
    // should we display the progress circle
    showProgressCircle = () => {
        const { domain, currentProgress, badDomainData } = this.state;
        if (badDomainData || !currentProgress) {
            return this.setState({ showProgressCircle: false }, this.showThirdCircle);
        }
        // verify start < current progress < end
        if (domain[0] < currentProgress && currentProgress < domain[1]) {
            return this.setState({ showProgressCircle: true }, this.showThirdCircle);
        }
        return this.showThirdCircle();
    }
    // should we display third circle
    showThirdCircle = () => {
        const { domain, thirdCircleData } = this.state;
        if (!thirdCircleData) {
            return this.setState({ showThirdCircle: false }, this.showProgressLine);
        }
        // start < third circle data < end
        if (domain[0] < thirdCircleData && thirdCircleData < domain[1]) {
            return this.setState({ showThirdCircle: true }, this.showProgressLine);
        }
        return this.showProgressLine();
    }
    // should we display the progress line
    showProgressLine = () => {
        const {
            domain,
            currentProgress,
            badDomainData
        } = this.state;
        if (badDomainData || !currentProgress) {
            return this.setState({ showProgressLine: false }, this.createXScales);
        }
        // verify current progress > start
        if (currentProgress > domain[0]) {
            return this.setState({ showProgressLine: true }, this.createXScales);
        }
        return this.createXScales();
    }
    // create xScales
    createXScales = () => {
        const { domain } = this.props;
        // scale for the entire visualization
        // need this to create and position the base rectangle and the start and end circles
        const { width, height } = this.props;
        const xScaleProgressBar = scaleLinear()
            .domain(domain)
            .range([0, width]);
        // 0 + diameter of circle + 2 ( designed this way )
        const progressWithinCirclesStartPX = height + 2;
        // total width - diameter of circle - 2 ( designed this way )
        const progressWithinCirclesEndPX = width - height - 2;
        // creates a scale within the start and end cirles
        // all domain values that show progress will need the
        const xScaleWithinCircles = scaleLinear()
            .domain(domain)
            .range([progressWithinCirclesStartPX, progressWithinCirclesEndPX]);
        this.setState({
            xScaleProgressBar,
            xScaleWithinCircles
        }, this.createProgressBarProperties);
    }
    // adds the start and end properties to state
    createProgressBarProperties = () => {
        const { xScaleProgressBar } = this.state;
        const [startData, endData] = this.props.domain;
        const startPosition = xScaleProgressBar(startData);
        const endPosition = xScaleProgressBar(endData);
        this.setState({
            startPosition,
            endPosition
        }, this.updateBaseRectangleProperties);
    }
    // base rectangle properties
    updateBaseRectangleProperties = () => {
        const {
            startPosition,
            endPosition,
            showThirdCircle,
            xScaleWithinCircles,
            thirdCircleData
        } = this.state;
        const { awardType, height } = this.props;
        const stateObject = {
            baseRectangleProperties: Object.assign({}, {
                x: startPosition,
                y: 0,
                rx: height / 2,
                ry: height / 2,
                height,
                width: endPosition - startPosition
            })
        };
        // logic of show pattern for base rectangle
        // this is an edge case for Award Dates Progress bar
        // allows the award dates section to use a pattern if a contract
        if (awardType && (awardType === 'contract' || awardType === 'definitive contract')) {
            if (showThirdCircle) {
                const positionOfThirdCircle = xScaleWithinCircles(thirdCircleData);
                const width = endPosition - startPosition;
                stateObject.patternForBaseRectangle = (
                    <TwoRectangles
                        id="awardDatesContractPattern"
                        width={width.toString()}
                        height={height.toString()}
                        backgroundWidth="100%"
                        backgroundHeight={height.toString()}
                        backgroundFill="#fad980"
                        fillWidth={`${positionOfThirdCircle}`}
                        fillHeight={height.toString()}
                        fillFill="#f1f1f1" />
                );
                stateObject.styleForBaseRectangle = { fill: "url(#awardDatesContractPattern)" };
            }
        }

        this.setState(
            stateObject,
            this.updateStartAndEndCircleProperties
        );
    }
    // start and end circle properties
    updateStartAndEndCircleProperties = () => {
        const {
            startPosition,
            endPosition
        } = this.state;

        const halfVisualizationHeight = this.props.height / 2;
        const startCircleProperties = Object.assign({}, {
            cx: startPosition + halfVisualizationHeight,
            cy: halfVisualizationHeight,
            r: halfVisualizationHeight
        });
        const endCircleProperties = Object.assign({}, {
            cx: endPosition - halfVisualizationHeight,
            cy: halfVisualizationHeight,
            r: halfVisualizationHeight
        });
        this.setState(
            { startCircleProperties, endCircleProperties },
            this.updateProgressCircleProperties
        );
    }
    // update progress circle properties
    updateProgressCircleProperties = () => {
        const {
            xScaleWithinCircles,
            currentProgress,
            showProgressCircle
        } = this.state;
        if (!showProgressCircle) return this.updateThirdCircleProperties();
        const positionOfCurrentProgress = xScaleWithinCircles(currentProgress);
        const progressCircleProperties = Object.assign({}, {
            cx: positionOfCurrentProgress,
            cy: this.props.height / 2,
            r: this.props.height / 6
        });
        return this.setState({ progressCircleProperties }, this.updateThirdCircleProperties);
    }
    // update third circle properties
    updateThirdCircleProperties = () => {
        const {
            xScaleWithinCircles,
            thirdCircleData,
            showThirdCircle
        } = this.state;
        if (!showThirdCircle) return this.updateProgressTextProperties();
        const positionOfThirdCircle = xScaleWithinCircles(thirdCircleData);
        const halfVisualizationHeight = this.props.height / 2;
        const thirdCircleProperties = Object.assign({}, {
            cx: positionOfThirdCircle,
            cy: halfVisualizationHeight,
            r: halfVisualizationHeight
        });
        return this.setState({ thirdCircleProperties }, this.updateProgressTextProperties);
    }
    // update progress text properties
    updateProgressTextProperties = () => {
        const {
            visualizationHeight,
            xScaleWithinCircles,
            currentProgress,
            progressText
        } = this.state;
        if (!progressText) return this.updateProgressLineProperties();
        const positionOfCurrentProgress = xScaleWithinCircles(currentProgress);
        const progressTextProperties = Object.assign({}, {
            x: positionOfCurrentProgress,
            y: 20
        });
        return this.setState({ progressTextProperties }, this.updateProgressLineProperties);
    }
    // update progress line properties
    updateProgressLineProperties = () => {
        const {
            xScaleWithinCircles,
            showProgressCircle,
            showProgressLine,
            currentProgress,
            showThirdCircle,
            thirdCircleProperties,
            progressCircleProperties
        } = this.state;
        const { height } = this.props;
        if (!showProgressLine) return;
        const startPosition = xScaleWithinCircles(this.props.domain[0]);
        const positionOfCurrentProgress = xScaleWithinCircles(currentProgress);
        // when showing the progress circle we subtract the radius of the progress circle
        // and we subtract 2 ( spacing, designed this way )
        const x2 = showProgressCircle ?
            positionOfCurrentProgress - progressCircleProperties.r - 2 :
            positionOfCurrentProgress;
        const progressLineProperties = Object.assign({}, {
            x1: startPosition,
            x2,
            y1: height / 2,
            y2: height / 2
        });
        // logic to update progress line and circle when showing the third circle
        if (showThirdCircle) {
            // position - the radius - 2 ( designed this way )
            const thirdCircleStartingPosition = thirdCircleProperties.cx - thirdCircleProperties.r - 2;
            // position + the radius + 2 ( designed this way )
            const thirdCircleEndPostion = thirdCircleProperties.cx + thirdCircleProperties.r + 2;
            // if the end position of the line crosses the start position of the third circle
            // cut the line off at the start of the third circle
            if (progressLineProperties.x2 > thirdCircleStartingPosition) {
                progressLineProperties.x2 = thirdCircleStartingPosition;
            }
            // update progress circle
            const progressCircleStartingPosition = progressCircleProperties.cx - progressCircleProperties.r;
            
             
        }
        this.setState({ progressLineProperties });
    }


    render() {
        const {
            startCircleProperties,
            endCircleProperties,
            progressCircleProperties,
            progressLineProperties,
            showProgressCircle,
            showProgressLine,
            progressTextProperties,
            progressText,
            showThirdCircle,
            thirdCircleProperties,
            styleForBaseRectangle,
            patternForBaseRectangle
        } = this.state;
        const { height, width } = this.props;
        const {
            x: baseRectX,
            y: baseRectY,
            rx: baseRectRX,
            ry: baseRectRY,
            height: baseRectHeight,
            width: baseRectWidth
        } = this.state.baseRectangleProperties;

        return (
            <svg
                className="progress-bar"
                width={width}
                height={height}>
                <g className="progress-bar-shapes">
                    {/* base rectangle */}
                    <g>
                        <defs>{patternForBaseRectangle}</defs>
                        <rect
                            className="progress-bar-shapes__base-rectangle"
                            style={styleForBaseRectangle}
                            x={baseRectX}
                            y={baseRectY}
                            rx={baseRectRX}
                            ry={baseRectRY}
                            width={baseRectWidth}
                            height={baseRectHeight} />
                    </g>
                    {/* starting circle */}
                    <circle
                        className="progress-bar-shapes__starting-circle"
                        cx={startCircleProperties.cx}
                        cy={startCircleProperties.cy}
                        r={startCircleProperties.r} />
                    {/* end circle */}
                    <circle
                        className="progress-bar-shapes__ending-circle"
                        cx={endCircleProperties.cx}
                        cy={endCircleProperties.cy}
                        r={endCircleProperties.r} />
                    {/* progress circle */}
                    {
                        showProgressCircle && <circle
                            className="progress-bar-shapes__progress-circle"
                            cx={progressCircleProperties.cx}
                            cy={progressCircleProperties.cy}
                            r={progressCircleProperties.r} />
                    }
                    {/* third circle */}
                    {
                        showThirdCircle && <circle
                            className="progress-bar-shapes__third-circle"
                            cx={thirdCircleProperties.cx}
                            cy={thirdCircleProperties.cy}
                            r={thirdCircleProperties.r} />
                    }
                    {/* progress text */}
                    {/* {
                        showProgressCircle && <text
                            className="progress-bar-shapes__progress-text"
                            x={progressTextProperties.x}
                            y={progressTextProperties.y}>
                            {progressText}
                        </text>
                    } */}
                    {/* progress line */}
                    {
                        showProgressLine && <line
                            className="progress-bar-shapes__progress-line"
                            x1={progressLineProperties.x1}
                            x2={progressLineProperties.x2}
                            y1={progressLineProperties.y1}
                            y2={progressLineProperties.y2} />
                    }
                </g>
            </svg>
        );
    }
}

ProgressBar.propTypes = propTypes;
