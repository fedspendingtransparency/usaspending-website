/**
  * TopFilterItem.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string.isRequired,
    toggleFilter: PropTypes.func,
    staged: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

const TopFilterItem = ({
    title = 'Filter', toggleFilter, staged, value
}) => {
    const onClick = () => {
        if (value) toggleFilter(value, staged);
        else toggleFilter();
    };

    const onKeyUp = (e) => {
        e.persist();
        if (e.key === 'Enter') onClick();
    };

    return (
        <div className="filter-item-container">
            <button
                onClick={onClick}
                onKeyUp={onKeyUp}
                type="button"
                aria-label={title}
                className={`filter-item${staged ? '' : ' unstaged'}`}
                value={title}
                tabIndex="0">
                <div className="filter-item-title">
                    {title}
                </div>
            </button>
        </div>
    );
};

TopFilterItem.propTypes = propTypes;

export default TopFilterItem;
