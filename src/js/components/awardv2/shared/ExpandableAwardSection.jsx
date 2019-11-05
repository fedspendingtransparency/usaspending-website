import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.oneOf(["primary", "secondary"]),
    buttonClass: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    secondaryContainerClass: PropTypes.string,
    primaryContainerClass: PropTypes.string,
    children: PropTypes.node
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

const maxChars = 210;

const ExpandableAwardSection = ({
    type = 'primary',
    buttonClass = 'award-expandable-btn',
    content,
    secondaryContainerClass = 'award-expandable-section__secondary',
    primaryContainerClass = 'award-expandable-section__primary',
    children
}) => {
    const [buttonValue, setButtonValue] = useState(buttonValueByButtonTypeAndState[type].contracted);
    const [isExpanded, setExpanded] = useState(false);

    const toggleButton = (e, prevButtonValue = buttonValue, prevIsExpanded = isExpanded) => {
        const newButtonValue = (prevButtonValue === buttonValueByButtonTypeAndState[type].expanded)
            ? buttonValueByButtonTypeAndState[type].contracted
            : buttonValueByButtonTypeAndState[type].expanded;
        setExpanded(!prevIsExpanded);
        setButtonValue(newButtonValue);
    };

    const button = (
        <button onClick={toggleButton} className={`${buttonClass} ${type}-btn`}>
            {buttonValue}
        </button>
    );

    if (type === 'secondary') {
        const isContentTruncated = content.length > maxChars;
        const truncatedContent = `${content.substring(0, maxChars)}...`;
        return (
            <p className={secondaryContainerClass}>
                {isContentTruncated && !isExpanded
                    ? truncatedContent
                    : content
                }
                {isContentTruncated && button}
            </p>
        );
    }
    return (
        <div className={primaryContainerClass}>
            {children}
            {isExpanded && content}
            {button}
        </div>
    );
};

ExpandableAwardSection.propTypes = propTypes;
export default ExpandableAwardSection;
