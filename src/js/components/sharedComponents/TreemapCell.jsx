/**
 * TreemapCell.jsx
 * Created by Kevin Li 8/17/17
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { labelColorFromBackground } from 'helpers/colorHelper';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    color: PropTypes.string,
    title: PropTypes.object,
    subtitle: PropTypes.object,
    data: PropTypes.object,
    selectedCell: PropTypes.func,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    goToUnreported: PropTypes.func,
    highlightColor: PropTypes.string
};

const TreemapCell = ({
    width,
    height,
    x,
    y,
    color,
    title,
    subtitle,
    data,
    selectedCell,
    showTooltip,
    hideTooltip,
    goToUnreported,
    highlightColor = '#fdb81e'
}) => {
    const [backgroundColor, setBackgroundColor] = useState('');
    const [active, setActive] = useState('');
    const [textColor, setTextColor] = useState('#ffffff');
    const elementRef = useRef(null);

    const setTextAndBackgroundColor = useCallback(() => {
        const newTextColor = labelColorFromBackground(color);
        setTextColor(newTextColor);
        setBackgroundColor(color);
    }, [color]);

    useEffect(() => {
        setTextAndBackgroundColor();
    }, [setTextAndBackgroundColor]);

    const exitedCell = () => {
        hideTooltip();
        setBackgroundColor(color);
        setActive('');
    };

    const clickedCell = () => {
        if (data.id !== 'undefined' && data.id) {
            exitedCell();
            selectedCell(data.id, data);
        }
        else if (data.name === 'Unreported Data') {
            exitedCell();
            goToUnreported(data);
        }
    };

    const enteredCell = () => {
        const position = {
            x: elementRef.current.getBoundingClientRect().left + (width / 2),
            y: elementRef.current.getBoundingClientRect().top + (height / 2)
        };

        showTooltip(position, {
            ...data,
            isAward: data.type === 'award'
        });

        setBackgroundColor(highlightColor);
        setActive('active');
    };

    let cellTitle = (
        <text
            className={`explorer-cell-title ${active}`}
            textAnchor="middle"
            fill={textColor}
            x={title.x}
            y={title.y}>
            {title.text}
        </text>
    );

    let cellValue = (
        <text
            className={`explorer-cell-value ${active}`}
            textAnchor="middle"
            fill={textColor}
            x={subtitle.x}
            y={subtitle.y}>
            {subtitle.text}
        </text>
    );

    if (width < 75 || height < 38) {
        cellTitle = '';
        cellValue = '';
    }
    const position = `translate(${x}, ${y})`;

    return (
        <g
            className="explorer-cell"
            transform={position}
            onClick={clickedCell}
            onMouseMove={enteredCell}
            onMouseLeave={exitedCell}
            ref={elementRef}>
            <title>
                {title.text}
            </title>
            <rect
                className="explorer-cell-box"
                x={0}
                y={0}
                width={width}
                height={height}
                style={{
                    fill: backgroundColor
                }} />
            {cellTitle}
            {cellValue}
        </g>
    );
};

TreemapCell.propTypes = propTypes;
export default TreemapCell;
