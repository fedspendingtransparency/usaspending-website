
import React, { forwardRef } from 'react';

const DefaultText = forwardRef((props, ref) => (
    <text
        tabIndex="0"
        aria-label={props.text}
        ref={ref}
        data-id={props.dataId}
        data-tooltip={props.tooltipId}
        className={`amounts-text ${props.className}`}
        x={props.x || 0}
        y={props.y || 0}
        onMouseMove={props.displayTooltip}
        onMouseLeave={props.hideTooltip}>
        {props.text}
    </text>
));

const TextGroup = (data) => data.data.map((textData) => (<DefaultText key={`${textData.text}-${textData.dataId}`} {...textData} ref={textData.ref} />));

export default TextGroup;
