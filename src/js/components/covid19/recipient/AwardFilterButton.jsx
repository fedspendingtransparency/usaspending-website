/**
 * AwardFilterButton.jsx
 * Created by Jonathan Hill 07/06/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from 'helpers/moneyFormatter';

const propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    showCount: PropTypes.bool,
    count: PropTypes.number
};

const AwardFilterButton = ({
    onClick,
    label,
    value,
    active,
    disabled,
    showCount,
    count
}) => {
    const click = () => {
        if (onClick) onClick(value);
    };
    const countBadge = showCount ? (
        <div className="count-badge">
            {((count || count === 0) && formatNumber(count)) || '--'}
        </div>
    ) : null;
    return (
        <div className={`award-filter__button ${active ? ' award-filter__button_active' : ''}`}>
            <button
                disabled={disabled}
                onClick={click}
                title={disabled ? `No results for ${label}` : `Results for ${label}`}>
                {label}
                {countBadge}
            </button>
        </div>
    );
};

AwardFilterButton.propTypes = propTypes;
export default AwardFilterButton;
