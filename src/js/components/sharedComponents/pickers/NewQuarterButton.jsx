/**
 * QuarterButton.jsx
 * Created by Lizzie Salita 10/15/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    showPeriods: PropTypes.bool,
    quarter: PropTypes.string,
    handleSelection: PropTypes.func,
    handleHover: PropTypes.func,
    handleBlur: PropTypes.func,
    toggleTooltip: PropTypes.func,
    title: PropTypes.string
};

const QuarterButton = ({
    disabled,
    active,
    quarter,
    handleSelection,
    toggleTooltip,
    title = '',
    handleHover,
    handleBlur,
    showPeriods = false
}) => {
    const quarterTitle = title || `Q ${quarter}`;

    const onMouseEnter = () => {
        if (disabled) {
            toggleTooltip(quarter);
        }
        else {
            handleHover(quarter, showPeriods ? 'period' : 'quarter');
        }
    };

    const onMouseLeave = () => {
        toggleTooltip(0);
        handleBlur(showPeriods ? 'period' : 'quarter');
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (!disabled) {
            handleSelection(quarter);
        }
    };

    let additionalClasses = disabled ? 'usa-dt-quarter-picker__quarter_disabled ' : '';
    if (quarter === '1') {
        additionalClasses += 'usa-dt-quarter-picker__quarter_first';
    }
    else if (quarter === '4') {
        additionalClasses += 'usa-dt-quarter-picker__quarter_last';
    }
    else if (title.includes('-')) {
        additionalClasses += 'usa-dt-quarter-picker__quarter_double';
    }

    if (!disabled && active) {
        additionalClasses += ' usa-dt-quarter-picker__quarter_active';
    }

    return (
        // Use CSS class and aria-disabled rather than disabled html property
        // so that the disabled buttons are still focusable to display
        // the warning tooltip
        <button
            className={`usa-dt-quarter-picker__quarter ${additionalClasses}`}
            onMouseDown={handleClick}
            onClick={handleClick}
            onMouseOver={onMouseEnter}
            onMouseEnter={onMouseEnter}
            onFocus={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onBlur={onMouseLeave}
            aria-disabled={disabled}>
            {quarterTitle}
        </button>
    );
};

QuarterButton.propTypes = propTypes;
export default QuarterButton;
