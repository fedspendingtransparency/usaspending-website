import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.oneOf(["primary", "secondary"]),
    buttonClass: PropTypes.string,
    content: PropTypes.string,
    contentClassName: PropTypes.string
};

const buttonValueByButtonTypeAndState = {
    primary: {
        expanded: 'SHOW LESS',
        contracted: 'SHOW MORE'
    },
    secondary: {
        expanded: 'read less',
        contracted: 'read more'
    }
};

const maxChars = 300;

const ExpandableAwardSection = ({
    type = 'primary',
    buttonClass = 'award-description__button',
    content,
    contentClassName = ''
}) => {
    const [buttonValue, setButtonValue] = useState(buttonValueByButtonTypeAndState[type].contracted);
    const [isExpanded, setExpanded] = useState(false);

    const isContentTruncated = content.length > maxChars;
    const truncatedContent = `${content.substring(0, maxChars)}...`;

    const toggleButton = (e, prevButtonValue = buttonValue, prevIsExpanded = isExpanded) => {
        const newButtonValue = (prevButtonValue === buttonValueByButtonTypeAndState[type].expanded)
            ? buttonValueByButtonTypeAndState[type].contracted
            : buttonValueByButtonTypeAndState[type].expanded;
        setExpanded(!prevIsExpanded);
        setButtonValue(newButtonValue);
    };

    return (
        <p className={contentClassName}>
            {isContentTruncated && !isExpanded
                ? truncatedContent
                : content
            }
            <button onClick={toggleButton} className={buttonClass}>
                {buttonValue}
            </button>
        </p>
    );
};

ExpandableAwardSection.propTypes = propTypes;
export default ExpandableAwardSection;
