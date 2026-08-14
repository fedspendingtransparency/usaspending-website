
import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    text: PropTypes.string,
    dataId: PropTypes.string,
    tooltipId: PropTypes.string,
    className: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    displayTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    ref: PropTypes.object
}

const DefaultText = ({
    text,
    dataId,
    tooltipId,
    className,
    x,
    y,
    displayTooltip,
    hideTooltip,
    ref
}) => (
    <text
        tabIndex="-1"
        aria-label={text}
        ref={ref}
        data-id={dataId}
        data-tooltip={tooltipId}
        className={`amounts-text ${className}`}
        x={x || 0}
        y={y || 0}
        onMouseMove={displayTooltip}
        onMouseLeave={hideTooltip}>
        {text}
    </text>
);

DefaultText.propTypes = propTypes;

const TextGroup = (data) => data.data.map(
    (textData) => (
        <DefaultText
            key={`${textData.text}-${textData.dataId}`}
            {...textData}
            ref={textData.ref} />
    )
);

export default TextGroup;
