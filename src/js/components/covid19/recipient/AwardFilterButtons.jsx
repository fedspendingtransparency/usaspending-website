/**
 * AwardFilterButtons.jsx
 * Created by Jonathan Hill 07/06/20
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onClick: PropTypes.func,
    filters: PropTypes.array,
    activeAwardTypeFilter: PropTypes.string,
    activeSpendingTypeFilter: PropTypes.string
};

const AwardFilterButtons = ({
    onClick,
    filters,
    activeAwardTypeFilter,
    activeSpendingTypeFilter
}) => {
    const click = (e) => {
        e.preventDefault();
        if (onClick) onClick(e.target.value);
    };
    const nonLoanFilters = filters.map((filter) => filter.value).filter((filter) => filter !== 'all').filter((filter) => filter !== 'loans');
    return (
        <div className="award-filter__buttons">
            {
                filters.map((button) => {
                    const isDisabled = activeSpendingTypeFilter === 'face_value_of_loan' && nonLoanFilters.includes(button.value);
                    return (
                        <div
                            key={button.value}
                            className={activeAwardTypeFilter === button.value ? 'award-filter__button active' : 'award-filter__button'}>
                            <button className={isDisabled ? 'disabled' : ''} disabled={isDisabled} value={button.value} onClick={click}>
                                {button.label}
                            </button>
                        </div>
                    );
                })
            }
        </div>
    );
};

AwardFilterButtons.propTypes = propTypes;
export default AwardFilterButtons;
