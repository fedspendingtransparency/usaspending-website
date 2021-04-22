/**
 * Text.jsx
 * created by Jonathan Hill 04/22/21
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    text: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        dataId: PropTypes.string,
        displayTooltip: PropTypes.func,
        hideTooltip: PropTypes.func,
        className: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
        reference: PropTypes.object
    }))
};

const Text = ({ text }) => (text.map((textData) => (
    <g
        tabIndex="0"
        key={textData.text}
        aria-label={textData.text}
        data-id={textData.dataId}
        onFocus={textData.displayTooltip}
        onBlur={textData.hideTooltip}>
        <desc>{textData.text}</desc>
        <text
            ref={textData._totalBudgetAuthorityValue}
            data-id={textData.dataId}
            className={textData.className}
            x={textData.x}
            y={textData.y}
            onMouseMove={textData.displayTooltip}
            onMouseLeave={textData.hideTooltip}>
            {textData.text}
        </text>
    </g>
)));

Text.propTypes = propTypes;
export default Text;
