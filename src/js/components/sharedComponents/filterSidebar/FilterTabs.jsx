/**
 * FilterTabs.jsx
 * Created by Brian Petway 07/23/24
 */

import React from 'react';
import PropTypes from 'prop-types';
import FilterTab from "./FilterTab";

const propTypes = {
    labels: PropTypes.array.isRequired,
    active: PropTypes.string.isRequired,
    switchTab: PropTypes.func.isRequired
};

const FilterTabs = ({ labels, active, switchTab }) => {
    console.log('here');

    const tabs = labels.map((label) => (
        <FilterTab
            label={label.label}
            active={active === label.internal}
            switchTab={switchTab}
            key={`filter-tab-${label.internal}`} />
    ));

    return (
        <div className="filter-tabs__outer-container">
            <div className="filter-tabs__inner-container">
                {tabs}
            </div>
        </div>
    );
};

FilterTabs.propTypes = propTypes;
export default FilterTabs;
