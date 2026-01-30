/**
 * TimeVisualizationPeriodButton.jsx
 * Created by Kevin Li 12/29/16
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    active: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    changePeriod: PropTypes.func
};

const TimeVisualizationPeriodButton = ({
    active,
    value,
    label,
    changePeriod
}) => {
    const clickedButton = () => {
        changePeriod(value);
    };

    let activeClass = '';
    if (active) {
        activeClass = ' active';
    }

    let description = `Show results by ${label.toLowerCase()}`;
    if (active) {
        description += ' (currently selected)';
    }

    return (
        <button
            className={`period-button${activeClass}`}
            value={value}
            title={description}
            aria-label={description}
            onClick={clickedButton}>
            {label}
        </button>
    );
};

TimeVisualizationPeriodButton.propTypes = propTypes;
export default TimeVisualizationPeriodButton;
