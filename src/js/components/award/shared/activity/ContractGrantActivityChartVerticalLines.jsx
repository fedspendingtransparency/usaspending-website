/**
 * ContractGrantActivityChartVerticalLines.jsx
 * Created by Jonathan Hill 04/23/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
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
    return (
        <g className="contract-grant-activity-chart__vertical-lines">
            {/* start line */}
            {xScale && <VerticalLine
                xScale={xScale}
                y1={-10}
                y2={height}
                textY={0}
                text="Start"
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
