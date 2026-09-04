/**
 * AwardTypeCell.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash-es';
import { QAT } from "GlobalConstants";
import useCallbackRef from "../../../../../hooks/useCallbackRef";

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
    const [svgWidth, setSvgWidth] = useState(0);

    const onMouseEnter = () => {
        toggleTooltipIn(awardType);
    };

    const labelWidth = x1 - x0;

    const ref = useCallbackRef((entry) => {
        try {
            setSvgWidth(entry.target.getBBox().width)
        }
        catch (e) {
            // Firefox can't compute bbox
            if (QAT) console.log({ e })
        }
    });

    // accounting for 15px margin
    const maxWidth = labelWidth / 1.5;

    let truncatedLabel = initialLabel;

    // make sure that the max width is positive
    if (svgWidth > maxWidth && maxWidth > 0) {
        // the label is going to exceed the available space, truncate it
        // average character width at 16px font size
        const avgCharWidth = 8;

        // determine how many characters can fit in the available space
        const maxChars = Math.floor((maxWidth) / avgCharWidth);

        // truncate the label
        truncatedLabel = truncate(initialLabel, { length: maxChars });
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
                ref={ref}
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
