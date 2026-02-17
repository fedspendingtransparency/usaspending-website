/**
 * FilterInteractiveTab.jsx
 * Created by JD House 02/17/2026
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    switchTab: PropTypes.func.isRequired,
    focusNextTab: PropTypes.func.isRequired,
    focusPrevTab: PropTypes.func.isRequired
};

const FilterInteractiveTab = ({
    label, active, switchTab, focusNextTab, focusPrevTab
}) => (
    <div
        id={`filter-tab-${label.internal}`}
        className={`filter-tabs__tab interactive ${active ? 'active' : ''}`}>
        <div
            className="filter-tabs__label"
            onClick={switchTab}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    switchTab(e);
                }
                else if (e.key === 'ArrowLeft') {
                    focusPrevTab(e);
                }
                else if (e.key === 'ArrowRight') {
                    focusNextTab(e);
                }
            }}
            title={`Show ${label.title}`}
            role="tab"
            aria-label={`Show ${label.title}`}
            aria-selected={active}
            tabIndex={active ? 0 : -1}>
            {label.label}
        </div>
        {label.interactiveLabel}
    </div>
);

FilterInteractiveTab.propTypes = propTypes;
export default FilterInteractiveTab;
