/**
 * ContractGrantActivityChartVerticalLines.jsx
 * Created by Jonathan Hill 04/23/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import VerticalLine from 'components/sharedComponents/VerticalLine';

const propTypes = {
    xScale: PropTypes.func,
    height: PropTypes.number,
    xDomain: PropTypes.array,
    padding: PropTypes.object,
    startLineValue: PropTypes.number,
    todayLineValue: PropTypes.number,
    endLineValue: PropTypes.number,
    potentialEndLineValue: PropTypes.number,
    awardType: PropTypes.string
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
    awardType
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
            {xScale && <VerticalLine
                xScale={xScale}
                y1={-10}
                y2={height}
                textY={0}
                text="Start"
                description={descriptions[0]}
                xMax={xDomain[1]}
                xMin={xDomain[0]}
                xValue={startLineValue}
                showTextPosition="right"
                adjustmentX={padding.left}
                textClassname="vertical-line__text start"
                lineClassname="vertical-line start" />}
            {/* today line */}
            {xScale && <VerticalLine
                xScale={xScale}
                y1={-10}
                y2={height}
                textY={0}
                text="Today"
                description={descriptions[1]}
                xMax={xDomain[1]}
                xMin={xDomain[0]}
                xValue={todayLineValue}
                showTextPosition="left"
                adjustmentX={padding.left}
                textClassname="vertical-line__text today"
                lineClassname="vertical-line today" />}
            {/* end line */}
            {xScale && <VerticalLine
                xScale={xScale}
                y1={-10}
                y2={height}
                textY={0}
                text={endLineText}
                description={descriptions[2]}
                xMax={xDomain[1]}
                xMin={xDomain[0]}
                xValue={endLineValue}
                showTextPosition="left"
                adjustmentX={padding.left}
                textClassname={`vertical-line__text ${endLineClassName}`}
                lineClassname={`vertical-line ${endLineClassName}`} />}
            {/* potential end line */}
            {xScale && <VerticalLine
                xScale={xScale}
                y1={-10}
                y2={height}
                textY={0}
                text="Potential End"
                description={descriptions[3]}
                xMax={xDomain[1]}
                xMin={xDomain[0]}
                xValue={potentialEndLineValue}
                showTextPosition="left"
                adjustmentX={padding.left}
                textClassname="vertical-line__text potential-end"
                lineClassname="vertical-line potential-end" />}
        </g>
    );
};

ContractGrantActivityChartVerticalLines.propTypes = propTypes;
export default ContractGrantActivityChartVerticalLines;
