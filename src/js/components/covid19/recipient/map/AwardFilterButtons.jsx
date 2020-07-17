/**
 * AwardFilterButtons.jsx
 * Created By Jonathan Hill 07/13/20
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onClick: PropTypes.func,
    activeAwardTypeFilter: PropTypes.string,
    activeSpendingTypeFilter: PropTypes.string,
    filters: PropTypes.array
};

const AwardFilterButtons = ({
    activeAwardTypeFilter,
    activeSpendingTypeFilter,
    onClick,
    filters
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
                            className={activeAwardTypeFilter === button.value ? 'award-filter__button award-filter__button_active' : 'award-filter__button'}>
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
