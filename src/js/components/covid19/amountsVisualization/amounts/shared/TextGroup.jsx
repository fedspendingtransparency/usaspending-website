
import React, { forwardRef } from 'react';

const DefaultText = forwardRef((props, ref) => (
    <g
        tabIndex="0"
        aria-label={props.text}
        data-id={props.dataId}
        onFocus={props.displayTooltip}
        onBlur={props.hideTooltip}>
        <desc>{props.text}</desc>
        <text
            ref={ref}
            data-id={props.dataId}
            className={props.className}
            x={props.x}
            y={props.y}
            onMouseMove={props.displayTooltip}
            onMouseLeave={props.hideTooltip}>
            {props.text}
        </text>
    </g>
));

const TextGroup = (data) => data.data.map((textData) => (<DefaultText key={`${textData.text}-${textData.dataId}`} {...textData} ref={textData.ref} />));

export default TextGroup;
