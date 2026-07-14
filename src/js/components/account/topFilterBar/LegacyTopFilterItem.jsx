/**
  * LegacyTopFilterItem.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.any,
    removeFilter: PropTypes.func,
    compressed: PropTypes.bool
};

const LegacyTopFilterItem = ({
    title = 'Filter', compressed = false, removeFilter, value
}) => {
    const clickedButton = () => {
        if (compressed) {
            return;
        }
        removeFilter(value);
    };

    const accessibleLabel = `Remove filter for ${title}`;

    let hideCompressed = '';

    if (compressed) {
        hideCompressed = 'hide';
    }

    return (
        <div className="filter-item-container">
            <button
                className="filter-item"
                aria-label={accessibleLabel}
                title={accessibleLabel}
                onClick={clickedButton}
                disabled={compressed}>
                <div className="filter-item-title">
                    {title}
                </div>
                <div className={`filter-item-remove-container ${hideCompressed}`}>
                    <div className="filter-remove">
                        <span className="sr-only">
                            {accessibleLabel}
                        </span>
                        <span className="close-icon">
                            <Icons.Close alt={accessibleLabel} />
                        </span>
                    </div>
                </div>
            </button>
        </div>
    );
};

LegacyTopFilterItem.propTypes = propTypes;
export default LegacyTopFilterItem;
