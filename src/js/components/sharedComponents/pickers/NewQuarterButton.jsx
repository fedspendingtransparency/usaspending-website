/**
 * QuarterButton.jsx
 * Created by Lizzie Salita 10/15/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    quarter: PropTypes.string,
    handleSelection: PropTypes.func,
    title: PropTypes.string
};

const QuarterButton = ({
    disabled,
    active,
    quarter,
    handleSelection,
    title = ''
}) => {
    const quarterTitle = title || `Q ${quarter}`;

    const handleClick = (e) => {
        e.preventDefault();
        if (!disabled) {
            handleSelection(quarter);
        }
    };

    let additionalClasses = disabled ? 'quarter-picker__quarter_disabled ' : '';
    if (quarter === '1') {
        additionalClasses += 'quarter-picker__quarter_first';
    }
    else if (quarter === '4') {
        additionalClasses += 'quarter-picker__quarter_last';
    }
    else if (title.includes('-')) {
        additionalClasses += 'quarter-picker__quarter_double';
    }

    if (!disabled && active) {
        additionalClasses += ' quarter-picker__quarter_active';
    }

    return (
        // Use CSS class and aria-disabled rather than disabled html property
        // so that the disabled buttons are still focusable to display
        // the warning tooltip
        <button
            className={`quarter-picker__quarter ${additionalClasses}`}
            onMouseDown={handleClick}
            onClick={handleClick}
            aria-disabled={disabled}>
            {quarterTitle}
        </button>
    );
};

QuarterButton.propTypes = propTypes;
export default QuarterButton;
