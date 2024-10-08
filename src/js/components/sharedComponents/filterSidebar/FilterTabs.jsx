/**
 * FilterTabs.jsx
 * Created by Brian Petway 07/23/24
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import FilterTab from "./FilterTab";

const propTypes = {
    labels: PropTypes.array.isRequired,
    active: PropTypes.string.isRequired,
    switchTab: PropTypes.func.isRequired
};

const FilterTabs = ({ labels, active, switchTab }) => {
    const ref = useRef();

    const focusNextTab = (e) => {
        const tabsInDom = ref.current && Array.from(ref.current.querySelectorAll('[role=tab]'));
        const currentPositionInTabs = tabsInDom.findIndex((ele) => ele.id === e.target.id);
        const nextPositionInTabs = currentPositionInTabs >= tabsInDom.length - 1 ? 0 : currentPositionInTabs + 1;
        tabsInDom[nextPositionInTabs].focus();
    };

    const focusPrevTab = (e) => {
        const tabsInDom = ref.current && Array.from(ref.current.querySelectorAll('[role=tab]'));
        const currentPositionInTabs = tabsInDom.findIndex((ele) => ele.id === e.target.id);
        const prevPositionInTabs = currentPositionInTabs === 0 ? tabsInDom.length - 1 : currentPositionInTabs - 1;
        tabsInDom[prevPositionInTabs].focus();
    };

    const tabs = labels.map((label) => (
        <FilterTab
            label={label}
            key={`filter-tab-${label.internal}`}
            active={active === label.internal}
            switchTab={switchTab}
            focusNextTab={focusNextTab}
            focusPrevTab={focusPrevTab} />
    ));

    return (
        <div className="filter-tabs__container" ref={ref} role="tablist" aria-labelledby="tablist-1">
            {tabs}
            <div className="filter-tabs__spacer" />
        </div>
    );
};

FilterTabs.propTypes = propTypes;
export default FilterTabs;
