/**
 * DefaultText.jsx
 * Created by Jonathan Hill 04/27/21
 */

import React, { forwardRef } from 'react';

const DefaultText = (props, ref) => (
    <g
        tabIndex="0"
        key={props.data.text}
        aria-label={props.data.text}
        data-id={props.dataId}
        onFocus={props.displayTooltip}
        onBlur={props.hideTooltip}>
        <desc>{props.data.text}</desc>
        <text
            ref={ref}
            data-id={props.dataId}
            className={props.data.className}
            x={props.data.x}
            y={props.data.y}
            onMouseMove={props.displayTooltip}
            onMouseLeave={props.hideTooltip}>
            {props.data.text}
        </text>
    </g>
);

export default forwardRef(DefaultText);
