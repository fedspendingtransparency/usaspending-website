/**
 * AwardFilterButtons.jsx
 * Created by Jonathan Hill 07/06/20
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onClick: PropTypes.func,
    filters: PropTypes.array,
    activeFilter: PropTypes.string
};

const AwardFilterButtons = ({ onClick, filters, activeFilter }) => {
    const click = (e) => {
        e.preventDefault();
        if (onClick) onClick(e.target.value);
    };
    return (
        <div className="award-filter__buttons">
            {
                filters.map((button) => (
                    <div
                        key={button.value}
                        className={activeFilter === button.value ? 'award-filter__button active' : 'award-filter__button'}>
                        <button value={button.value} onClick={click}>
                            {button.label}
                        </button>
                    </div>
                ))
            }
        </div>
    );
};

AwardFilterButtons.propTypes = propTypes;
export default AwardFilterButtons;
