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
    const tabs = labels.map((label) => (
        <FilterTab
            label={label.label}
            active={active === label.internal}
            switchTab={switchTab}
            key={`filter-tab-${label.internal}`} />
    ));

    return (
        <div className="filter-tabs__container">
            {tabs}
            <div className="filter-tabs__spacer" />
        </div>
    );
};

FilterTabs.propTypes = propTypes;
export default FilterTabs;
