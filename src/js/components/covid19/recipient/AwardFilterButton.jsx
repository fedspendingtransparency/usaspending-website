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
    activeFilter: PropTypes.string
};

const AwardFilterButton = ({
    onClick,
    label,
    value,
    activeFilter
}) => {
    const click = () => {
        if (onClick) onClick(value);
    };
    return (
        <div className={activeFilter === value ? 'award-filter__button active' : 'award-filter__button'}>
            <button onClick={click}>
                {label}
            </button>
        </div>
    );
};

AwardFilterButton.propTypes = propTypes;
export default AwardFilterButton;
