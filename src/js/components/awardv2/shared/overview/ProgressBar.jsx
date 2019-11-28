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
    awardType: PropTypes.string,
    progressText: PropTypes.string
};

export default class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xScaleProgressBar: null,
            xScaleWithinCircles: null,
            currentProgress: 0,
            thirdCircleData: 0,
            badDomainData: false,
            showThirdCircle: false
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

        this.setState({
            domain,
            currentProgress,
            thirdCircleData,
            badDomainData
        }, this.showThirdCircle);
    }
    // should we display third circle
    showThirdCircle = () => {
        const { domain, thirdCircleData, badDomainData } = this.state;
        if (!thirdCircleData || badDomainData) {
            return this.setState({ showThirdCircle: false }, this.createXScales);
        }
        // start < third circle data < end
        if (domain[0] < thirdCircleData && thirdCircleData < domain[1]) {
            return this.setState({ showThirdCircle: true }, this.createXScales);
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
        // 0 + diameter of circle + 2
        const progressWithinCirclesStartPX = height + 2;
        // total width - diameter of circle - 2
        const progressWithinCirclesEndPX = width - height - 2;
        // creates a scale within the start and end cirles
        // all domain values that show progress will need the
        const xScaleWithinCircles = scaleLinear()
            .domain(domain)
            .range([progressWithinCirclesStartPX, progressWithinCirclesEndPX]);

        this.setState({ xScaleProgressBar, xScaleWithinCircles });
    }
    // progress bar pattern
    progressBarPattern = () => {
        const { awardType, height, domain } = this.props;
        const {
            xScaleProgressBar,
            xScaleWithinCircles,
            showThirdCircle,
            thirdCircleData
        } = this.state;

        const startPosition = xScaleProgressBar(domain[0]);
        const endPosition = xScaleProgressBar(domain[1]);

        // this is an edge case for Award Dates Progress bar
        // allows the award dates section to use a pattern if a contract
        if (awardType && showThirdCircle) {
            if (awardType && (awardType === 'contract' || awardType === 'definitive contract')) {
                const positionOfThirdCircle = xScaleWithinCircles(thirdCircleData);
                const width = endPosition - startPosition;
                return (
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
            }
            return null;
        }
        return null;
    }
    // progress bar
    progressBar = () => {
        const { height, domain, awardType } = this.props;
        const { xScaleProgressBar, showThirdCircle } = this.state;

        const rectHeight = height / 2;

        const startPosition = xScaleProgressBar(domain[0]);
        const endPosition = xScaleProgressBar(domain[1]);
        let style = {};
        if (awardType) {
            if ((awardType === 'contract' || awardType === 'definitive contract') && showThirdCircle) {
                style = { fill: "url(#awardDatesContractPattern)" };
            }
        }

        return (
            <rect
                className="progress-bar-shapes__base-rectangle"
                style={style}
                x={startPosition}
                y={0}
                rx={rectHeight}
                ry={rectHeight}
                width={endPosition - startPosition}
                height={height} />
        );
    }
    // create circle
    createCircle = (circleData) => {
        const {
            className,
            cx,
            cy,
            r
        } = circleData;
        return (
            <circle
                className={className}
                cx={cx}
                cy={cy}
                r={r} />
        );
    }
    // progress starting circle
    startCircle = () => {
        const { domain, height } = this.props;
        const { xScaleProgressBar } = this.state;

        const halfVisualizationHeight = height / 2;
        const startPosition = xScaleProgressBar(domain[0]);

        return this.createCircle({
            className: 'progress-bar-shapes__starting-circle',
            cx: startPosition + halfVisualizationHeight,
            cy: halfVisualizationHeight,
            r: halfVisualizationHeight
        });
    }
    // progress ending circle
    endCircle = () => {
        const { domain, height } = this.props;
        const { xScaleProgressBar } = this.state;

        const halfVisualizationHeight = height / 2;
        const endPosition = xScaleProgressBar(domain[1]);

        return this.createCircle({
            className: 'progress-bar-shapes__ending-circle',
            cx: endPosition - halfVisualizationHeight,
            cy: halfVisualizationHeight,
            r: halfVisualizationHeight
        });
    }
    // cases when not to show progress circle
    showProgressCircle = () => {
        const { height, domain } = this.props;
        const {
            xScaleWithinCircles,
            currentProgress,
            badDomainData,
            thirdCircleData,
            showThirdCircle
        } = this.state;
        // Case I - bad data
        if (badDomainData || !currentProgress) return false;
        // Case II - currently in progress
        if (!(domain[0] < currentProgress && currentProgress < domain[1])) return false;

        const halfVisualizationHeight = height / 2;
        const positionOfCurrentProgress = xScaleWithinCircles(currentProgress);
        // Case III - do not show if in third circle's diameter
        if (showThirdCircle) {
            const positionOfThirdCircle = xScaleWithinCircles(thirdCircleData);
            const progressCircleStartingPosition = positionOfCurrentProgress - (height / 6) - 2;
            const progressCircleEndPosition = positionOfCurrentProgress + (height / 6) + 2;
            // position - the radius - 2 ( designed this way )
            const thirdCircleStartingPosition = positionOfThirdCircle - halfVisualizationHeight - 2;
            // position + the radius + 2 ( designed this way )
            const thirdCircleEndPostion = positionOfThirdCircle + halfVisualizationHeight + 2;
            // if the third circle is covering the progress circle, do not display the progress circle
            if ((thirdCircleStartingPosition < progressCircleEndPosition) && (progressCircleStartingPosition < thirdCircleEndPostion)) {
                return false;
            }
        }
        // Case IV - too close to end circle
        // current progress position + radius
        const positionOfCurrentProgressEnd = positionOfCurrentProgress + (height / 6);
        // since the end circle aligns with the end of the graph endCircleStart = end of progress - diameter of end circle - 2
        const endCircleStart = domain[1] - height - 2;
        if (positionOfCurrentProgressEnd > endCircleStart) return false;
        return true;
    }
    // progress circle
    progressCircle = () => {
        const { height } = this.props;
        const {
            xScaleWithinCircles,
            currentProgress
        } = this.state;
        // do not show progress circle
        if (!this.showProgressCircle()) return null;

        const positionOfCurrentProgress = xScaleWithinCircles(currentProgress);

        return this.createCircle({
            className: 'progress-bar-shapes__progress-circle',
            cx: positionOfCurrentProgress,
            cy: height / 2,
            r: height / 6
        });
    }
    // third circle
    thirdCircle = () => {
        const {
            xScaleWithinCircles,
            thirdCircleData,
            showThirdCircle,
            badDomainData
        } = this.state;

        if (!showThirdCircle || badDomainData) return null;

        const positionOfThirdCircle = xScaleWithinCircles(thirdCircleData);
        const halfVisualizationHeight = this.props.height / 2;

        return this.createCircle({
            className: 'progress-bar-shapes__third-circle',
            cx: positionOfThirdCircle,
            cy: halfVisualizationHeight,
            r: halfVisualizationHeight
        });
    }
    // create line
    createLine = (lineData) => {
        const {
            className,
            x1,
            x2,
            y1,
            y2
        } = lineData;
        return (
            <line
                className={className}
                x1={x1}
                x2={x2}
                y1={y1}
                y2={y2} />
        );
    }
    // progress lines
    progressLines = () => {
        const {
            xScaleWithinCircles,
            currentProgress,
            badDomainData,
            thirdCircleData,
            showThirdCircle
        } = this.state;
        const { height, domain } = this.props;

        if (!currentProgress || badDomainData) return { firstProgressLine: null, secondProgressLine: null };

        const halfVisualizationHeight = (height / 2);
        const startPosition = xScaleWithinCircles(this.props.domain[0]);
        const positionOfCurrentProgress = xScaleWithinCircles(currentProgress);

        let secondProgressLine = null;
        let x2 = 0;
        // Case I - always account for progress circle ( position - radius - 2 )
        x2 = positionOfCurrentProgress - (height / 6) - 2;
        // Case II - completed progress
        if (currentProgress >= domain[1]) {
            x2 = xScaleWithinCircles(domain[1]);
        }
        // Case III - third circle
        if (showThirdCircle) {
            const thirdCirclePosition = xScaleWithinCircles(thirdCircleData);
            const thirdCircleStartingPosition = thirdCirclePosition - halfVisualizationHeight - 2;
            const thirdCircleEndPostion = thirdCirclePosition + halfVisualizationHeight + 2;
            const progressCircleStart = positionOfCurrentProgress - (height / 6) - 2;
            // stops the line at the third circle
            if (x2 > thirdCircleStartingPosition) {
                x2 = thirdCircleStartingPosition;
                // now we need to determine if we need to draw another line
                // if there is space between the end of the third circle and the start of
                // of the progress circle, create a second progress line
                const spaceBetweenProgressCircleAndThirdCircle = progressCircleStart - thirdCircleEndPostion;
                if (spaceBetweenProgressCircleAndThirdCircle > 0) {
                    secondProgressLine = this.createLine({
                        className: 'progress-bar-shapes__progress-line',
                        x1: thirdCircleEndPostion,
                        x2: progressCircleStart,
                        y1: halfVisualizationHeight,
                        y2: halfVisualizationHeight
                    });
                }
            }
        }
        const firstProgressLine = this.createLine({
            className: 'progress-bar-shapes__progress-line',
            x1: startPosition,
            x2,
            y1: halfVisualizationHeight,
            y2: halfVisualizationHeight
        });
        return { firstProgressLine, secondProgressLine };
    }

    render() {
        const { xScaleProgressBar, xScaleWithinCircles } = this.state;
        const { height, width } = this.props;

        if (!xScaleProgressBar || !xScaleWithinCircles) return null;

        const { firstProgressLine, secondProgressLine } = this.progressLines();

        return (
            <svg
                className="progress-bar"
                width={width}
                height={height}>
                <g className="progress-bar-shapes">
                    <g>
                        <defs>{this.progressBarPattern()}</defs>
                        {this.progressBar()}
                    </g>
                    {this.startCircle()}
                    {this.endCircle()}
                    {this.progressCircle()}
                    {this.thirdCircle()}
                    { firstProgressLine }
                    { secondProgressLine }
                </g>
            </svg>
        );
    }
}

ProgressBar.propTypes = propTypes;
