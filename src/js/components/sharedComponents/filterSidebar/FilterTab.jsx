/**
 * FilterTabs.jsx
 * Created by Brian Petway 07/23/24
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    labels: PropTypes.array.isRequired,
    active: PropTypes.bool.isRequired,
    switchTab: PropTypes.func.isRequired
};

const FilterTab = ({ label, active, switchTab }) => {
    console.log('filterTab');

    return (
        <>
            <div className={`filter-tabs__tab-wrapper ${active ? 'active' : ''}`}>
                <div
                    className="filter-tabs__tab"
                    role="tab"
                    onClick={switchTab}
                    onKeyDown={switchTab}
                    title={`Show ${label.label}`}
                    aria-label={`Show ${label.label}`}
                    tabIndex={0}>
                    <div className="filter-tabs__label">
                        {label}
                    </div>
                </div>
            </div>
        </>
    );
};

FilterTab.propTypes = propTypes;
export default FilterTab;
