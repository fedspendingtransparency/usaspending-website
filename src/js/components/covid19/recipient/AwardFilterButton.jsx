/**
 * AwardFilterButton.jsx
 * Created by Jonathan Hill 07/06/20
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool
};

const AwardFilterButton = ({
    onClick,
    label,
    value,
    active,
    disabled
}) => {
    const click = () => {
        if (onClick) onClick(value);
    };
    return (
        <div className={`award-filter__button ${active ? ' award-filter__button_active' : ''}`}>
            <button
                disabled={disabled}
                onClick={click}
                title={disabled ? `No results for ${label}` : ''}>
                {label}
            </button>
        </div>
    );
};

AwardFilterButton.propTypes = propTypes;
export default AwardFilterButton;
