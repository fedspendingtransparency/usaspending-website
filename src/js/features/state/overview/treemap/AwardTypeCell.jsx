/**
 * AwardTypeCell.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash-es';

const propTypes = {
    label: PropTypes.string,
    x0: PropTypes.number,
    x1: PropTypes.number,
    y0: PropTypes.number,
    awardType: PropTypes.string,
    color: PropTypes.string,
    strokeColor: PropTypes.string,
    strokeOpacity: PropTypes.number,
    toggleTooltipIn: PropTypes.func,
    toggleTooltipOut: PropTypes.func,
    opacity: PropTypes.number,
    textColor: PropTypes.string,
    textClass: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    labelView: PropTypes.string
};

const AwardTypeCell = ({
    label: initialLabel,
    x0,
    x1,
    y0,
    awardType,
    color,
    strokeColor,
    strokeOpacity,
    toggleTooltipIn,
    toggleTooltipOut,
    opacity,
    textColor,
    textClass,
    height,
    width,
    labelView
}) => {
    const svgRef = useRef(null);

    const onMouseEnter = () => {
        toggleTooltipIn(awardType);
    };

    const labelWidth = x1 - x0;

    // determine if the text needs to be truncated
    // get the current label width

    // We have to wrap this in a try/catch to prevent Firefox from dying when trying
    // to compute the bounded box of small SVG elements
    let fullWidth = 0;
    try {
        fullWidth = svgRef.current.getBBox().width;
    }
    catch (e) {
        // Firefox can't compute bbox
    }

    // accounting for 15px margin
    const maxWidth = labelWidth / 1.5;
    let maxChars = 0;

    let truncatedLabel = initialLabel;

    // make sure that the max width is positive
    if (fullWidth > maxWidth && maxWidth > 0) {
        // the label is going to exceed the available space, truncate it
        // calculate the average character width
        const avgCharWidth = (fullWidth / initialLabel.length);

        // determine how many characters can fit in the available space
        maxChars = Math.floor((maxWidth) / avgCharWidth);

        // truncate the label
        truncatedLabel = truncate(initialLabel, {
            length: maxChars
        });
    }

    return (
        <g
            transform={`translate(${x0},${y0})`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={toggleTooltipOut}>
            <rect
                className="tile"
                width={width}
                height={height}
                style={{
                    fill: color,
                    stroke: strokeColor,
                    strokeOpacity,
                    strokeWidth: "2px",
                    padding: "10px"
                }} />
            <text
                className={`category ${textClass}`}
                x={(width / 2)}
                y={height / 2}
                width={width}
                textAnchor="middle"
                ref={svgRef}
                style={{
                    display: labelView,
                    fill: textColor,
                    opacity
                }}>
                {truncatedLabel}
            </text>
        </g>
    );
};

AwardTypeCell.propTypes = propTypes;
export default AwardTypeCell;
