/**
 * FilterTab.jsx
 * Created by Brian Petway 07/23/24
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    switchTab: PropTypes.func.isRequired,
    focusNextTab: PropTypes.func.isRequired,
    focusPrevTab: PropTypes.func.isRequired
};

const FilterTab = ({
    label, title, active, switchTab, focusNextTab, focusPrevTab
}) => (
    <div
        id={`filter-tab-${title}`}
        className={`filter-tabs__tab ${active ? 'active' : ''}`}
        onClick={switchTab}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                switchTab(e);
            } else if (e.key === 'ArrowLeft') {
                focusPrevTab(e);
            } else if (e.key === 'ArrowRight') {
                focusNextTab(e);
            }
        }}
        title={`Show ${title}`}
        role="tab"
        aria-label={`Show ${title}`}
        aria-selected={active}
        aria-controls={`tabpanel-${title}`}
        tabIndex={active ? 0 : -1}>
        <div className="filter-tabs__label">
            {label}
        </div>
    </div>
);

FilterTab.propTypes = propTypes;
export default FilterTab;
