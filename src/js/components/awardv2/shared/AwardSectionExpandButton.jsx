import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.oneOf(["primary", "secondary"]),
    buttonClass: PropTypes.string,
    isExpanded: PropTypes.bool.isRequired,
    setExpanded: PropTypes.func.isRequired
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

const AwardSectionExpandButton = ({
    type = 'primary',
    buttonClass = 'award-description__button',
    isExpanded = false,
    setExpanded
}) => {
    const [buttonValue, setButtonValue] = useState(buttonValueByButtonTypeAndState[type].contracted);

    const toggleButton = (e, prevButtonValue = buttonValue, prevIsExpanded = isExpanded) => {
        const newButtonValue = (prevButtonValue === buttonValueByButtonTypeAndState[type].expanded)
            ? buttonValueByButtonTypeAndState[type].contracted
            : buttonValueByButtonTypeAndState[type].expanded;
        setExpanded(!prevIsExpanded);
        setButtonValue(newButtonValue);
    };

    return (
        <React.Fragment>
            <button
                onClick={toggleButton}
                className={buttonClass}>
                {buttonValue}
            </button>
        </React.Fragment>
    );
};

AwardSectionExpandButton.propTypes = propTypes;
export default AwardSectionExpandButton;
