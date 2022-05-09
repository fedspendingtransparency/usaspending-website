/**
 * ProgressBar.jsx
 * Created by Jonathan Hill 11/26/19
 **/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { pull, compact, uniqueId, isEmpty } from 'lodash';
import RectanglePattern from 'components/sharedComponents/patterns/RectanglePattern';

const propTypes = {
    heightOfSVG: PropTypes.number,
    heightOfProgressBar: PropTypes.number,
    width: PropTypes.number,
    domain: PropTypes.array,
    milestones: PropTypes.array,
    currentProgress: PropTypes.number,
    awardType: PropTypes.string,
    progressText: PropTypes.string,
    textAdjustment: PropTypes.object,
    badDomainData: PropTypes.bool,
    descriptions: PropTypes.object
};

export default class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xScaleProgressBar: null,
            xScaleWithinCircles: null,
            thirdCircleData: 0,
            badDomainData: false,
            milestoneData: [],
            showMilestones: false,
            progressVerticalLineData: {},
            progressBarPatternData: {},
            progressTriangleData: '',
            progressTextData: {},
            progressTextPosition: null
        };
        this.textDiv = null;
        // React will call this function when the DOM draws it ( React Callback Refs )
        this.setTextDiv = (element) => {
            this.textDiv = element;
            this.positionText();
        };
    }

    // recreate the progress bar on window resize
    componentDidUpdate(prevProps) {
        if (
            prevProps.width !== this.props.width
            || prevProps.domain !== this.props.domain
            || prevProps.milestones !== this.props.milestones
        ) {
            this.validateDomainAndMilestones();
            // DataFlow
            // 1. start
            // 2. validateDomainAndMilestones
            // 2. createXScales
            // 3. milestoneData
            // 4. showMilestones
            // 5. progressVerticalLineData
            // 6. progressTriangleData
            // 7. progressBarPatternData
            // 8. progressTextData
            this.positionText();
        }
    }

    badDomainData = () => {
        const {
            currentProgress,
            domain,
            badDomainData
        } = this.props;
        // validation of domain
        if (badDomainData) return true;
        pull(domain, null, undefined, '');
        if (domain.length !== 2) return true;
        if (domain[0] > domain[1]) return true;
        // handle bad dates

        const badDataCount = this.props.milestones.reduce((acc, milestone) => {
            if (milestone.data > domain[1]) {
                acc.badData++;
                return acc;
            }
            if (milestone.data < domain[0]) {
                acc.badData++;
                return acc;
            }
            return acc;
        }, { badData: 0 });
        if (badDataCount.badData > 0) return true;
        // validation of current progress
        if (!currentProgress) return true;
        return false;
    };

    validateDomainAndMilestones = () => {
        const badDomainData = this.badDomainData();
        this.setState({ badDomainData }, this.createXScales);
    };
    // create xScales
    createXScales = () => {
        const { domain } = this.props;
        // scale for the entire visualization
        const { width } = this.props;
        const { heightOfProgressBar } = this.props;
        const xScaleProgressBar = scaleLinear()
            .domain(domain)
            .range([0, width]);
        // 0 + diameter of circle
        const progressWithinCirclesStartPX = heightOfProgressBar;
        // total width - diameter of circle
        const progressWithinCirclesEndPX = width - heightOfProgressBar;
        // creates a scale within the start and end cirles
        // all domain values that show progress will need the
        const xScaleWithinCircles = scaleLinear()
            .domain(domain)
            .range([progressWithinCirclesStartPX, progressWithinCirclesEndPX]);

        this.setState({ xScaleProgressBar, xScaleWithinCircles }, this.milestoneData);
    };
    // create milestone data
    milestoneData = () => {
        const {
            domain,
            milestones,
            width,
            heightOfProgressBar,
            descriptions
        } = this.props;
        const { xScaleProgressBar, xScaleWithinCircles } = this.state;

        const halfVisualizationHeight = heightOfProgressBar / 2;
        const progressMilestones = milestones || [];
        const startPosition = xScaleProgressBar(domain[0]);
        const endPosition = width;
        // add first milestone
        progressMilestones.unshift({
            data: domain[0],
            className: 'progress-bar-shapes__starting-circle',
            description: descriptions.startDescription,
            cx: startPosition + halfVisualizationHeight,
            position: startPosition + halfVisualizationHeight,
            visualizationStart: startPosition,
            visualizationEnd: startPosition + heightOfProgressBar
        });
        // add last milestone
        progressMilestones.push({
            data: domain[1],
            className: 'progress-bar-shapes__ending-circle',
            description: descriptions.endDescription,
            cx: endPosition - halfVisualizationHeight,
            position: endPosition - halfVisualizationHeight,
            visualizationStart: endPosition - heightOfProgressBar,
            visualizationEnd: endPosition
        });
        const milestoneData = progressMilestones.map((milestone) => {
            const position = xScaleWithinCircles(milestone.data);
            const circleStart = position - halfVisualizationHeight;
            const circleEnd = position + halfVisualizationHeight;
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
    };
    // show milestones
    showMilestones = () => {
        const { milestoneData } = this.state;
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
        return this.setState({
            milestoneData: displayMilestoneData
        }, this.progressVerticalLineData);
    };
    // progress circle data
    progressVerticalLineData = () => {
        const { milestoneData, xScaleWithinCircles } = this.state;
        const {
            currentProgress,
            domain,
            descriptions,
            heightOfProgressBar
        } = this.props;
        const position = xScaleWithinCircles(currentProgress);
        const progressVerticalLineData = {
            className: 'progress-bar-shapes__progress-vertical-line',
            description: descriptions.progressVerticalLineDescription,
            key: `progress-line`,
            x1: position,
            x2: position,
            y1: 0,
            y2: heightOfProgressBar,
            visualizationStart: position,
            visualizationEnd: position,
            display: true
        };
        // show progress vertical line
        milestoneData.forEach((milestone, index, array) => {
            // verify the progress vertical line is not covered by any milestone
            if (
                (progressVerticalLineData.visualizationEnd > milestone.visualizationStart) &&
                (progressVerticalLineData.visualizationStart < milestone.visualizationEnd)
            ) {
                // verify milestone is not the same as domain end
                if (array.length > 2 && array[1].display) {
                    progressVerticalLineData.display = false;
                }
            }
            // verify the progress vertical line does not flow into last milestone
            if ((index + 1 === array.length) &&
                (progressVerticalLineData.visualizationEnd > milestone.visualizationStart)
            ) {
                progressVerticalLineData.display = false;
            }
        });
        // verify currently in progress
        if (!(domain[0] < currentProgress && currentProgress < domain[1])) {
            progressVerticalLineData.display = false;
        }
        this.setState({ progressVerticalLineData }, this.progressTriangleData);
    };
    // progress triangle
    // the points are three coordinate pairs in the form of x,y
    // they are in order from left to right as a string separated by a space
    progressTriangleData = () => {
        const { xScaleWithinCircles } = this.state;
        const { currentProgress, heightOfProgressBar } = this.props;
        const position = xScaleWithinCircles(currentProgress);
        // the x value of the coordinate pairs are in porportion
        // to the height of the progress bar for reusability
        const adjustXPosition = heightOfProgressBar / 3;
        // the y value of the coordinate pairs are in porportion
        // to the height of the progress bar for reusability
        const adjustYPosition = heightOfProgressBar / 2;
        // first point is the top of the triangle
        const firstPoint = `${position},${heightOfProgressBar}`;
        // second point is the left bottom of the triangle
        const secondPoint = `${position - adjustXPosition},${heightOfProgressBar + adjustYPosition}`;
        // third point is the right bottom of the triangle
        const thirdPoint = `${position + adjustXPosition},${heightOfProgressBar + adjustYPosition}`;
        // svg polygon points array
        const points = [firstPoint, secondPoint, thirdPoint].join(' ');
        this.setState({ progressTriangleData: points }, this.progressBarPatternData);
    };
    // progress bar pattern data
    progressBarPatternData = () => {
        const { awardType, heightOfProgressBar } = this.props;
        const {
            milestoneData,
            progressVerticalLineData
        } = this.state;

        // pattern properties
        const patternProps = {
            id: 'progressBarPattern',
            height: `${heightOfProgressBar}`,
            width: '100%'
        };
        // patterns for RectanglePattern Component
        const rectangles = [];
        // current end date to potential enddate
        let currentToPotentialPattern = null;
        // progression pattern width
        // this may change due to milestone data
        let progressPatternPosition = progressVerticalLineData.x1;
        // background pattern width
        // this may change due to milestone data
        let backgroundPatternRectangleWidth = '100%';
        // award overview dates progress bar for contracts
        if (awardType && (awardType === 'contract' || awardType === 'definitive contract')) {
            if (milestoneData[1].display) {
                currentToPotentialPattern = {
                    key: 'currentToPotentialPattern',
                    height: `${heightOfProgressBar}`,
                    width: '100%',
                    fill: '#fff1d2'
                };
                const positionOfThirdCircle = milestoneData[1].cx;
                backgroundPatternRectangleWidth = positionOfThirdCircle;
                if (progressPatternPosition > positionOfThirdCircle) {
                    progressPatternPosition = positionOfThirdCircle;
                }
            }
        }
        // background pattern - background drawn last
        const backgroundPatternRectangleProps = {
            key: 'BackgroundProgressBarRectPattern',
            height: `${heightOfProgressBar}`,
            width: backgroundPatternRectangleWidth,
            fill: '#f1f1f1'
        };
        // progression pattern
        const progressPattern = {
            key: 'progressPattern',
            height: `${heightOfProgressBar}`,
            width: progressPatternPosition,
            fill: '#d6d7d9'
        };
        // build rectangle
        rectangles.push(
            currentToPotentialPattern,
            backgroundPatternRectangleProps,
            progressPattern
        );
        const progressBarPatternData = { patternProps, rectangles: compact(rectangles) };
        this.setState({ progressBarPatternData }, this.progressTextData);
    };
    // progress text data
    progressTextData = () => {
        const {
            progressText,
            heightOfProgressBar,
            textAdjustment,
            currentProgress
        } = this.props;
        const {
            xScaleWithinCircles,
            badDomainData,
            progressTextPosition
        } = this.state;
        const textPosition = xScaleWithinCircles(currentProgress);
        const progressTextData = {
            className: 'progress-bar-shapes__progress-text',
            x: (progressTextPosition || textPosition) - (textAdjustment.x || 0),
            y: heightOfProgressBar + textAdjustment.y,
            text: progressText,
            display: true
        };
        // bad data or completed progression
        if (
            !currentProgress
            || badDomainData
            || currentProgress >= this.props.domain[1]
            || currentProgress <= this.props.domain[0]
        ) {
            progressTextData.display = false;
        }
        this.setState({ progressTextData });
    };
    positionText = () => {
        const {
            progressTextData,
            xScaleWithinCircles
        } = this.state;
        const { currentProgress } = this.props;
        if (this.textDiv && progressTextData.x) {
            let textPosition = null;
            const textDivDimensions = this.textDiv.getBoundingClientRect();
            const width = textDivDimensions.width;
            // first position text halfway
            textPosition = xScaleWithinCircles(currentProgress) - (width / 2);
            // Since we are using two different scales to display this progress bar
            // we must make some calculations to figure out if the progress text is
            // overflowing outside the SVG.

            // Adjusts the text position to the left if it is showing outside the SVG to the right
            // Considering the two scales, the current progress position is not scaled for the
            // entire width of the SVG, it accounts for the start and end progress circles and
            // will not give us an accurate pixel count to compare the text width to.
            // Therefore, we need to complete the following steps to know if the text overflows:
            // 1. Get the total pixels between the current progress and then end of the progress
            // between the cirlces.
            // 2. Get the total pixels from the end of the progress between the circles and the
            // end of the SVG.
            // 3. Determine if half the text width (since we position the text directly in the
            // center of progress) is greater than the total pixels left in the SVG.
            // 4. If #3 is true, we must then determine the amount of pixel overflow by subtracting
            // half the text width and the pixels available in the SVG and update the new postion of
            // the text.
            const totalProgressionLength = xScaleWithinCircles(this.props.domain[1]);
            const currentProgressPosition = xScaleWithinCircles(currentProgress);
            // 1. pixels between current progress and the end of progress
            const pixelsBetweenProgressAndProgressEnd = totalProgressionLength - currentProgressPosition;
            // 3. pixels available in the SVG
            const pixelsAvailableToTheEndOfTheVis = pixelsBetweenProgressAndProgressEnd + this.props.heightOfProgressBar;
            const halfTheTextWidth = width / 2;
            // 4.
            if (pixelsAvailableToTheEndOfTheVis < halfTheTextWidth) {
                const widthOvershowing = halfTheTextWidth - pixelsAvailableToTheEndOfTheVis;
                // adding two for some extra room on resizing
                textPosition -= (widthOvershowing + 2);
            }
            // handle text overflowing to the left
            if (textPosition < 0) {
                textPosition = 0;
            }
            // update the new text position
            if (textPosition) {
                // updateProgressTextData.x = progressTextPosition;
                return this.setState({ progressTextPosition: textPosition }, this.progressTextData);
            }
        }
        return null;
    };
    // progress text
    progressText = () => {
        const { progressTextData, badDomainData } = this.state;
        if (!progressTextData.display || badDomainData) return null;
        return (
            <g tabIndex="0">
                <desc>{this.props.descriptions.progressTextDescription}</desc>
                <text
                    className={progressTextData.className}
                    x={progressTextData.x}
                    y={progressTextData.y}
                    ref={this.setTextDiv}>
                    {progressTextData.text}
                </text>
            </g>
        );
    };
    // progress bar
    progressBar = () => {
        const { width, heightOfProgressBar, descriptions } = this.props;

        const rectHeight = heightOfProgressBar / 2;
        const startPosition = 0;
        const endPosition = width;
        const style = { fill: "url(#progressBarPattern)" };
        const description = descriptions.progressDescription;

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
                    height={heightOfProgressBar} />
            </g>
        );
    };
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
    };
    // create line
    createLine = (lineData) => {
        if (!lineData) return null;
        if (!lineData.display) return null;
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
    };
    progressTriangle = () => (
        <g tabIndex="0">
            <desc>{this.props.descriptions.progressTriangleDescription}</desc>
            <polygon
                points={this.state.progressTriangleData}
                className="progress-bar-shapes__polygon" />
        </g>
    );
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
    progressVerticalLine = () => this.createLine(this.state.progressVerticalLineData);
    // progress bar pattern
    progressBarPattern = () => {
        const { progressBarPatternData } = this.state;
        if (isEmpty(progressBarPatternData)) return null;
        return (
            <RectanglePattern
                patternProps={progressBarPatternData.patternProps}
                rectangles={progressBarPatternData.rectangles} />
        );
    };

    render() {
        const { xScaleProgressBar, xScaleWithinCircles, badDomainData } = this.state;
        const { heightOfSVG, width } = this.props;
        if (!xScaleProgressBar || !xScaleWithinCircles || badDomainData) return null;
        return (
            <svg
                className="progress-bar"
                width={width}
                height={heightOfSVG}>
                <g className="progress-bar-shapes">
                    <g>
                        <defs>{this.progressBarPattern()}</defs>
                        {this.progressBar()}
                    </g>
                    {this.milestones()}
                    {this.progressVerticalLine()}
                    {this.progressText()}
                    {this.progressTriangle()}
                </g>
            </svg>
        );
    }
}

ProgressBar.propTypes = propTypes;
