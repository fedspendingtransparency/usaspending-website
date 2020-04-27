/**
 * ContractGrantActivityChartVerticalLines.jsx
 * Created by Jonathan Hill 04/23/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SVGLine from 'components/sharedComponents/SVGLine';

const propTypes = {
    xScale: PropTypes.func,
    height: PropTypes.number,
    xDomain: PropTypes.array,
    padding: PropTypes.object,
    startLineValue: PropTypes.number,
    todayLineValue: PropTypes.number,
    endLineValue: PropTypes.number,
    potentialEndLineValue: PropTypes.number,
    awardType: PropTypes.string,
    showHideTooltip: PropTypes.func
};

const ContractGrantActivityChartVerticalLines = ({
    xScale,
    height,
    xDomain,
    padding,
    startLineValue,
    todayLineValue,
    endLineValue,
    potentialEndLineValue,
    awardType,
    showHideTooltip
}) => {
    // text for end line
    const endLineText = awardType === 'grant' ? 'End' : 'Current End';
    // class name for end line and text
    const endLineClassName = awardType === 'grant' ? 'grant-end' : 'contract-end';
    const lineData = [
        {
            text: 'Start Date',
            date: startLineValue
        },
        {
            text: 'Todays Date',
            date: todayLineValue
        },
        {
            text: 'End Date',
            date: endLineValue
        },
        {
            text: 'Potential End Date',
            date: potentialEndLineValue
        }
    ];
    const descriptions = [startLineValue, todayLineValue, endLineValue, potentialEndLineValue]
        .map((line, i) => `A vertical line representing the ${lineData[i].text}, ${moment(lineData[i].date).format("dddd, MMMM Do YYYY") || ''}`);
    return (
        <g className="contract-grant-activity-chart__vertical-lines">
            {/* start line */}
            {xScale && <SVGLine
                scale={xScale}
                y1={-10}
                y2={height}
                textY={0}
                text="Start"
                description={descriptions[0]}
                max={xDomain[1]}
                min={xDomain[0]}
                position={startLineValue}
                showTextPosition="right"
                adjustmentX={padding.left}
                textClassname="start"
                lineClassname="start"
                onMouseMoveLine={showHideTooltip}
                onMouseLeaveLine={showHideTooltip}
                onMouseMoveText={showHideTooltip}
                onMouseLeaveText={showHideTooltip} />}
            {/* today line */}
            {xScale && <SVGLine
                scale={xScale}
                y1={-10}
                y2={height}
                textY={0}
                text="Today"
                description={descriptions[1]}
                max={xDomain[1]}
                min={xDomain[0]}
                position={todayLineValue}
                showTextPosition="left"
                adjustmentX={padding.left}
                textClassname="today"
                lineClassname="today" />}
            {/* end line */}
            {xScale && <SVGLine
                scale={xScale}
                y1={-10}
                y2={height}
                textY={0}
                text={endLineText}
                description={descriptions[2]}
                max={xDomain[1]}
                min={xDomain[0]}
                position={endLineValue}
                showTextPosition="left"
                adjustmentX={padding.left}
                textClassname={`${endLineClassName}`}
                lineClassname={`${endLineClassName}`}
                onMouseMoveLine={showHideTooltip}
                onMouseLeaveLine={showHideTooltip}
                onMouseMoveText={showHideTooltip}
                onMouseLeaveText={showHideTooltip} />}
            {/* potential end line */}
            {xScale && <SVGLine
                scale={xScale}
                y1={-10}
                y2={height}
                textY={0}
                text="Potential End"
                description={descriptions[3]}
                max={xDomain[1]}
                min={xDomain[0]}
                position={potentialEndLineValue}
                showTextPosition="left"
                adjustmentX={padding.left}
                textClassname="potential-end"
                lineClassname="potential-end"
                onMouseMoveLine={showHideTooltip}
                onMouseLeaveLine={showHideTooltip}
                onMouseMoveText={showHideTooltip}
                onMouseLeaveText={showHideTooltip} />}
        </g>
    );
};

ContractGrantActivityChartVerticalLines.propTypes = propTypes;
export default ContractGrantActivityChartVerticalLines;
