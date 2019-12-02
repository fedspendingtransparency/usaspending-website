/**
 * ProgressBar.jsx
 * Created by Jonathan Hill 11/26/19
 **/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { pull, compact, uniqueId } from 'lodash';
import TwoRectangles from 'components/sharedComponents/patterns/TwoRectangles';

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    domain: PropTypes.array,
    startDescription: PropTypes.string,
    endDescription: PropTypes.string,
    milestones: PropTypes.array,
    currentProgress: PropTypes.number,
    awardType: PropTypes.string,
    progressText: PropTypes.string,
    progressDescription: PropTypes.string,
    lineDescription: PropTypes.string,
    progressCircleDescription: PropTypes.string,
    textAdjustment: PropTypes.number
};

export default class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visualizationHeight: 0,
            xScaleProgressBar: null,
            xScaleWithinCircles: null,
            currentProgress: 0,
            thirdCircleData: 0,
            badDomainData: false,
            milestoneData: [],
            showMilestones: false,
            progressCircleData: {},
            progressLineData: []
        };
    }
    // recreate the progress bar on window resize
    componentDidUpdate(prevProps) {
        if (prevProps.width !== this.props.width) {
            console.log(' Width : ', this.props.width);
            this.start();
        }
    }

    start = () => {
        this.validationOfProps();
    }
    // validity of domain, currentProgress, and thirdCircleData
    validationOfProps = () => {
        let {
            domain,
            currentProgress
        } = this.props;
        // validation of domain
        let badDomainData = false;
        pull(domain, null, undefined, '');
        if (domain.length !== 2) {
            domain = [0, 1];
            badDomainData = true;
        }
        // handle bad dates
        this.props.milestones.forEach((milestone) => {
            if (milestone.data > domain[1]) {
                domain = [0, 1];
                badDomainData = true;
            }
            if (milestone.data < domain[0]) {
                domain = [0, 1];
                badDomainData = true;
            }
        });
        // validation of current progress
        if (!currentProgress) currentProgress = null;
        const newHeight = this.props.height - 15;
        this.setState({
            domain,
            currentProgress,
            badDomainData,
            visualizationHeight: newHeight
        }, this.createXScales);
    }
    // create xScales
    createXScales = () => {
        const { domain } = this.props;
        // scale for the entire visualization
        // need this to create and position the base rectangle and the start and end circles
        const { width } = this.props;
        const { visualizationHeight } = this.state;
        const xScaleProgressBar = scaleLinear()
            .domain(domain)
            .range([0, width]);
        // 0 + diameter of circle + 2
        const progressWithinCirclesStartPX = visualizationHeight + 2;
        // total width - diameter of circle - 2
        const progressWithinCirclesEndPX = width - visualizationHeight - 2;
        // creates a scale within the start and end cirles
        // all domain values that show progress will need the
        const xScaleWithinCircles = scaleLinear()
            .domain(domain)
            .range([progressWithinCirclesStartPX, progressWithinCirclesEndPX]);

        this.setState({ xScaleProgressBar, xScaleWithinCircles }, this.milestoneData);
    }
    // create milestone data
    // other methods will reference this in state
    milestoneData = () => {
        const { domain, milestones, width } = this.props;
        const { xScaleProgressBar, visualizationHeight, xScaleWithinCircles } = this.state;

        const halfVisualizationHeight = visualizationHeight / 2;
        const progressMilestones = milestones || [];
        const startPosition = xScaleProgressBar(domain[0]);
        const endPosition = width;
        // add first milestone
        progressMilestones.unshift({
            data: domain[0],
            className: 'progress-bar-shapes__starting-circle',
            description: this.props.startDescription,
            cx: startPosition + halfVisualizationHeight,
            position: startPosition + halfVisualizationHeight,
            visualizationStart: startPosition,
            visualizationEnd: startPosition + visualizationHeight + 2
        });
        // add last milestone
        progressMilestones.push({
            data: domain[1],
            className: 'progress-bar-shapes__ending-circle',
            description: this.props.endDescription,
            cx: endPosition - halfVisualizationHeight,
            position: endPosition - halfVisualizationHeight,
            visualizationStart: endPosition - visualizationHeight - 2,
            visualizationEnd: endPosition
        });
        const milestoneData = progressMilestones.map((milestone) => {
            const position = xScaleWithinCircles(milestone.data);
            const circleStart = position - halfVisualizationHeight - 2;
            const circleEnd = position + halfVisualizationHeight + 2;
            return {
                key: `${uniqueId(milestone.data)}`,
                description: milestone.description,
                className: milestone.className,
                cx: milestone.cx || position,
                cy: halfVisualizationHeight,
                r: halfVisualizationHeight,
                visualizationStart: milestone.visualizationStart || circleStart,
                visualizationEnd: milestone.visualizationEnd || circleEnd,
                display: false
            };
        });
        this.setState({ milestoneData }, this.showMilestones);
    }
    // show milestones
    showMilestones = () => {
        const { milestoneData, badDomainData } = this.state;
        if (badDomainData) {
            return this.setState({ showMilestones: false });
        }
        // milestones do not overlap with start and end milestone
        const lastMilestoneIndex = milestoneData.length - 1;
        const displayMilestoneData = milestoneData.map((milestone, index, array) => {
            const milestoneObject = { ...milestone };
            // ignore start and end milestones
            if (index !== 0 && index !== lastMilestoneIndex) {
                const startMilestoneEndPosition = array[0].visualizationEnd;
                const endMilestoneStartPosition = array[lastMilestoneIndex].visualizationStart;
                // verify current milestone start is after first milestone end and
                // current milestone end is before last milestone start
                if (
                    (milestone.visualizationStart > startMilestoneEndPosition) &&
                    (milestone.visualizationEnd < endMilestoneStartPosition)
                ) {
                    milestoneObject.display = true;
                }
                return milestoneObject;
            }
            milestoneObject.display = true;
            return milestoneObject;
        });
        return this.setState({ milestoneData: displayMilestoneData }, this.progressCircleData);
    }
    // progress circle data
    progressCircleData = () => {
        const { milestoneData, xScaleWithinCircles, visualizationHeight } = this.state;
        const { currentProgress, domain, progressCircleDescription } = this.props;
        const position = xScaleWithinCircles(currentProgress);
        const radius = visualizationHeight / 6;
        // add progress milestone
        const progressCircleData = {
            cx: position,
            cy: visualizationHeight / 2,
            className: 'progress-bar-shapes__progress-circle',
            description: progressCircleDescription,
            r: radius,
            visualizationStart: position - radius - 2,
            visualizationEnd: position + radius + 2,
            display: true
        };
        // show progress circle
        milestoneData.forEach((milestone, index, array) => {
            // verify the progress circle is not covered by any milestone
            if (
                (progressCircleData.visualizationEnd > milestone.visualizationStart) &&
                (progressCircleData.visualizationStart < milestone.visualizationEnd)
            ) {
                progressCircleData.display = false;
            }
            // verify the progress circle does not flow into last milestons
            if ((index + 1 === array.length) &&
                (progressCircleData.visualizationEnd > milestone.visualizationStart)
            ) {
                progressCircleData.display = false;
            }
        });
        // verify currently in progress
        if (!(domain[0] < currentProgress && currentProgress < domain[1])) {
            progressCircleData.display = false;
        }
        this.setState({ progressCircleData }, this.progressLineData);
    }
    // progress circle
    progressCircle = () => {
        const { progressCircleData } = this.state;
        if (!progressCircleData.display) return null;
        return this.createCircle(progressCircleData);
    };
    // progression milestones ( removes milestones that have display false )
    milestones = () => compact(
        this.state.milestoneData.filter((milestone) => milestone.display)
    ).map((milestone) => this.createCircle({
        key: `${uniqueId(milestone.data)}`,
        description: milestone.description,
        className: milestone.className,
        cx: milestone.cx,
        cy: milestone.cy,
        r: milestone.r
    }));
    // progress lines
    progressLineData = () => {
        const {
            xScaleWithinCircles,
            badDomainData,
            milestoneData,
            progressCircleData,
            visualizationHeight
        } = this.state;
        const { domain, width } = this.props;

        if (!milestoneData || badDomainData) return [];
        const halfVisualizationHeight = (visualizationHeight / 2);
        const description = this.props.lineDescription;
        const progressLines = milestoneData.map((milestone, index, milestoneArray) => {
            const progressLineData = {
                className: 'progress-bar-shapes__progress-line',
                description,
                key: `${index}progress-line`,
                x1: 0,
                x2: 0,
                y1: halfVisualizationHeight,
                y2: halfVisualizationHeight
            };
            // if we are at the last milestone, do nothing
            if (index + 1 === milestoneArray.length) return null;

            const nextMilestone = milestoneArray[index + 1];
            progressLineData.x1 = xScaleWithinCircles(domain[0]);
            progressLineData.x2 = progressCircleData.cx;
            // special case domains are the same
            if (domain[0] === domain[1]) {
                progressLineData.x2 = width - visualizationHeight - 2;
            }
            // if progress is not past this milestone, ignore
            if (
                (progressLineData.x2 > milestone.visualizationStart) &&
                (progressLineData.x2 < milestone.visualizationEnd)
            ) {
                return null;
            }
            // if there are no milestones, ignore drawing more than one line
            if ((milestoneArray.length === 2) && (index !== 0)) {
                return null;
            }
            // if we are not at the first line and progress is past the next milestone
            if ((index !== 0) && (progressLineData.x2 > milestone.visualizationEnd)) {
                progressLineData.x1 = milestone.visualizationEnd;
            }
            // if progress line is going past another milestone stop the line
            // only if milestone is visible
            if (
                (progressLineData.x2 > nextMilestone.visualizationStart) &&
                nextMilestone.display
            ) {
                progressLineData.x2 = nextMilestone.visualizationStart;
            }
            // if we are showing the progress circle, account for it
            if (
                (progressLineData.x2 < nextMilestone.visualizationStart) &&
                progressCircleData.display
            ) {
                progressLineData.x2 = progressCircleData.visualizationStart;
            }
            // if we are going through the end stop
            if (progressLineData.x2 > milestoneArray[milestoneArray.length - 1].visualizationStart) {
                progressLineData.x2 = milestoneArray[milestoneArray.length - 1].visualizationStart;
            }

            return progressLineData;
        });

        const progressLineData = compact(progressLines);
        return this.setState({ progressLineData });
    }
    // progress lines
    progressLines = () => this.state.progressLineData.map((line) => this.createLine(line));
    // progress bar pattern
    progressBarPattern = () => {
        const { awardType } = this.props;
        const { milestoneData, visualizationHeight, showMilestones } = this.state;
        // this is an edge case for Award Dates Progress bar
        // allows the award dates section to use a pattern if a contract
        if (awardType && showMilestones) {
            if (awardType && (awardType === 'contract' || awardType === 'definitive contract')) {
                const positionOfThirdCircle = milestoneData[1].cx;
                const width = milestoneData[2].cx - milestoneData[0].cx;
                return (
                    <TwoRectangles
                        id="awardDatesContractPattern"
                        width={width.toString()}
                        height={visualizationHeight.toString()}
                        backgroundWidth="100%"
                        backgroundHeight={visualizationHeight.toString()}
                        backgroundFill="#fad980"
                        fillWidth={`${positionOfThirdCircle}`}
                        fillHeight={visualizationHeight.toString()}
                        fillFill="#f1f1f1" />
                );
            }
            return null;
        }
        return null;
    }
    // progress bar
    progressBar = () => {
        const { awardType, width } = this.props;
        const { showMilestones, visualizationHeight } = this.state;

        const rectHeight = visualizationHeight / 2;
        const startPosition = 0;
        const endPosition = width;
        let style = {};
        if (awardType) {
            if ((awardType === 'contract' || awardType === 'definitive contract') && showMilestones) {
                style = { fill: "url(#awardDatesContractPattern)" };
            }
        }
        const description = this.props.progressDescription;

        return (
            <g tabIndex="0">
                <desc>{description}</desc>
                <rect
                    className="progress-bar-shapes__base-rectangle"
                    style={style}
                    x={startPosition}
                    y={0}
                    rx={rectHeight}
                    ry={rectHeight}
                    width={endPosition - startPosition}
                    height={visualizationHeight} />
            </g>
        );
    }
    // create circle
    createCircle = (circleData) => {
        if (!circleData) return null;
        const {
            description,
            key,
            className,
            cx,
            cy,
            r
        } = circleData;
        return (
            <g key={key} tabIndex="0">
                <desc>{description}</desc>
                <circle
                    className={className}
                    cx={cx}
                    cy={cy}
                    r={r} />
            </g>
        );
    }
    // create line
    createLine = (lineData) => {
        if (!lineData) return null;
        const {
            className,
            description,
            key,
            x1,
            x2,
            y1,
            y2
        } = lineData;
        return (
            <g key={key} tabIndex="0">
                <desc>{description}</desc>
                <line
                    className={className}
                    x1={x1}
                    x2={x2}
                    y1={y1}
                    y2={y2} />
            </g>
        );
    }
    // progress text
    progressText = () => {
        const { progressText } = this.props;
        if (!progressText) return null;
        const {
            currentProgress,
            xScaleWithinCircles,
            badDomainData,
            visualizationHeight
        } = this.state;
        if (!currentProgress || badDomainData) return null;
        const textPosition = xScaleWithinCircles(currentProgress);
        // completed
        if (currentProgress >= this.props.domain[1]) return null;
        return (
            <text
                className="progress-bar-shapes__progress-text"
                x={textPosition - (this.props.textAdjustment || 0)}
                y={visualizationHeight + 13}>
                {progressText}
            </text>
        );
    }

    render() {
        const { xScaleProgressBar, xScaleWithinCircles } = this.state;
        const { height, width } = this.props;

        if (!xScaleProgressBar || !xScaleWithinCircles) return null;

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
                    {this.milestones()}
                    {this.progressCircle()}
                    {this.progressLines()}
                    {this.progressText()}
                </g>
            </svg>
        );
    }
}

ProgressBar.propTypes = propTypes;
