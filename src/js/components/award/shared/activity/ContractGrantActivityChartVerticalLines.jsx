/**
 * ContractGrantActivityChartVerticalLines.jsx
 * Created by Jonathan Hill 04/23/2020
 */

import React from 'react';
import PropTypes, { array } from 'prop-types';
import { uniqueId } from 'lodash';
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
    showHideTooltip: PropTypes.func,
    thisLineOrTextIsHovered: PropTypes.string,
    verticalLineTextData: PropTypes.func,
    startLineHeight: PropTypes.number,
    endLineHeight: PropTypes.number,
    potentialEndLineHeight: PropTypes.number,
    todayLineHeight: PropTypes.number
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
    showHideTooltip,
    thisLineOrTextIsHovered,
    verticalLineTextData,
    startLineHeight,
    endLineHeight,
    potentialEndLineHeight,
    todayLineHeight
}) => {
    console.log(' Start Lines : ', startLineValue);
    // text for end line
    const endLineText = awardType === 'grant' ? 'End' : 'Current End';
    // class name for end line and text
    const endLineClassName = awardType === 'grant' ? 'grant-end' : 'contract-end';
    const lineData = [
        {
            text: 'Start Date',
            date: startLineValue,
            classname: thisLineOrTextIsHovered === 'Start' ? 'start noOpacity' : 'start'
        },
        {
            text: 'Todays Date',
            date: todayLineValue
        },
        {
            text: 'End Date',
            date: endLineValue,
            classname: thisLineOrTextIsHovered === endLineText ? `${endLineClassName} noOpacity` : `${endLineClassName}`
        },
        {
            text: 'Potential End Date',
            date: potentialEndLineValue,
            classname: thisLineOrTextIsHovered === 'Potential End' ? 'potential-end noOpacity' : 'potential-end'
        }
    ];
    const descriptions = [startLineValue, todayLineValue, endLineValue, potentialEndLineValue]
        .map((line, i) => `A vertical line representing the ${lineData[i].text}, ${moment(lineData[i].date).format("dddd, MMMM Do YYYY") || ''}`);
    const getLineData = (text) => {
        if (text === 'Start') {
            if (Array.isArray(startLineValue)) {
                return startLineValue.map((data) => {
                    const newData = data;
                    newData.textY = startLineHeight;
                    newData.text = 'Start';
                    newData.description = descriptions[0];
                    newData.lineClassname = lineData[0].classname;
                    newData.textClassname = 'start';
                    return newData;
                });
            }
            return [
                {
                    y1: startLineHeight - 10,
                    y2: height,
                    text: 'Start',
                    position: startLineValue,
                    textY: startLineHeight,
                    description: descriptions[0],
                    lineClassname: lineData[0].classname,
                    textClassname: 'start'
                }
            ];
        }
        if (text === 'End') {
            if (Array.isArray(endLineValue)) {
                return endLineValue.map((data) => {
                    const newData = data;
                    newData.text = endLineText;
                    newData.textY = endLineHeight;
                    newData.description = descriptions[2];
                    newData.lineClassname = lineData[2].classname;
                    newData.textClassname = endLineClassName;
                    return newData;
                });
            }
            return [{
                y1: endLineHeight - 10,
                y2: height,
                position: endLineValue,
                text: endLineText,
                textY: endLineHeight,
                description: descriptions[2],
                lineClassname: lineData[2].classname,
                textClassname: endLineClassName
            }];
        }
        if (Array.isArray(potentialEndLineValue)) {
            return potentialEndLineValue.map((data) => {
                const newData = data;
                newData.text = 'Potential End';
                newData.textY = potentialEndLineHeight;
                newData.description = descriptions[3];
                newData.lineClassname = lineData[3].classname;
                newData.textClassname = 'potential-end';
                return newData;
            });
        }
        return [{
            y1: potentialEndLineHeight - 10,
            y2: height,
            position: potentialEndLineValue,
            text: 'Potential End',
            textY: potentialEndLineHeight,
            description: descriptions[3],
            lineClassname: lineData[3].classname,
            textClassname: 'potential-end'
        }];
    };
    const createLine = (data) => (
        <SVGLine
            key={uniqueId()}
            scale={xScale}
            y1={data.y1}
            y2={data.y2}
            textY={data.textY}
            text={data.text}
            description={data.description}
            max={xDomain[1]}
            min={xDomain[0]}
            position={data.position}
            showTextPosition="right"
            adjustmentX={padding.left}
            textClassname={data.textClassname}
            lineClassname={data.lineClassname}
            onMouseMoveLine={showHideTooltip}
            onMouseLeaveLine={showHideTooltip}
            onMouseMoveText={showHideTooltip}
            onMouseLeaveText={showHideTooltip}
            verticalLineTextData={verticalLineTextData} />
    );
    const getLines = (text) => {
        if (text === 'Start') {
            const lines = getLineData('Start');
            return lines.map((data) => createLine(data));
        }
        if (text === 'End') {
            const lines = getLineData('End');
            return lines.map((data) => createLine(data));
        }
        const lines = getLineData('Potential');
        return lines.map((data) => createLine(data));
    };
    return (
        <g className="contract-grant-activity-chart__vertical-lines">
            {getLines('Start')}
            {getLines('End')}
            {getLines('Potential')}
            {/* start line */}
            {/* {xScale && <SVGLine
                scale={xScale}
                y1={startLineHeight - 10}
                y2={height}
                textY={startLineHeight}
                text="Start"
                description={descriptions[0]}
                max={xDomain[1]}
                min={xDomain[0]}
                position={startLineValue}
                showTextPosition="right"
                adjustmentX={padding.left}
                textClassname="start"
                lineClassname={lineData[0].classname}
                onMouseMoveLine={showHideTooltip}
                onMouseLeaveLine={showHideTooltip}
                onMouseMoveText={showHideTooltip}
                onMouseLeaveText={showHideTooltip}
                verticalLineTextData={verticalLineTextData} />} */}
            {/* today line */}
            {xScale && <SVGLine
                scale={xScale}
                y1={todayLineHeight - 10}
                y2={height}
                textY={todayLineHeight}
                text="Today"
                description={descriptions[1]}
                max={xDomain[1]}
                min={xDomain[0]}
                position={todayLineValue}
                showTextPosition="left"
                adjustmentX={padding.left}
                textClassname="today"
                lineClassname="today"
                verticalLineTextData={verticalLineTextData} />}
            {/* end line */}
            {/* {xScale && <SVGLine
                scale={xScale}
                y1={endLineHeight - 10}
                y2={height}
                textY={endLineHeight}
                text={endLineText}
                description={descriptions[2]}
                max={xDomain[1]}
                min={xDomain[0]}
                position={endLineValue}
                showTextPosition="left"
                adjustmentX={padding.left}
                textClassname={`${endLineClassName}`}
                lineClassname={lineData[2].classname}
                onMouseMoveLine={showHideTooltip}
                onMouseLeaveLine={showHideTooltip}
                onMouseMoveText={showHideTooltip}
                onMouseLeaveText={showHideTooltip}
                verticalLineTextData={verticalLineTextData} />} */}
            {/* potential end line */}
            {/* {xScale && <SVGLine
                scale={xScale}
                y1={potentialEndLineHeight - 10}
                y2={height}
                textY={potentialEndLineHeight}
                text="Potential End"
                description={descriptions[3]}
                max={xDomain[1]}
                min={xDomain[0]}
                position={potentialEndLineValue}
                showTextPosition="left"
                adjustmentX={padding.left}
                textClassname="potential-end"
                lineClassname={lineData[3].classname}
                onMouseMoveLine={showHideTooltip}
                onMouseLeaveLine={showHideTooltip}
                onMouseMoveText={showHideTooltip}
                onMouseLeaveText={showHideTooltip}
                verticalLineTextData={verticalLineTextData} />} */}
        </g>
    );
};

ContractGrantActivityChartVerticalLines.propTypes = propTypes;
export default ContractGrantActivityChartVerticalLines;
