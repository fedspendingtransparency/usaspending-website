/**
  * ResultsTableTabs.jsx
  * Created by Kevin Li 11/29/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import ResultsTableTabItem from './ResultsTableTabItem';

const propTypes = {
    types: PropTypes.array,
    counts: PropTypes.object,
    active: PropTypes.string,
    switchTab: PropTypes.func,
    disabled: PropTypes.bool,
    hideCounts: PropTypes.bool,
    tabsClassName: PropTypes.string
};

const ResultsTableTabs = ({
    types,
    counts,
    active,
    switchTab,
    disabled,
    hideCounts,
    tabsClassName
}) => {
    const tabs = types.map((type) => {
        const count = hideCounts ? null : counts[type.internal];
        return (
            <ResultsTableTabItem
                {...type}
                count={count}
                active={active === type.internal}
                switchTab={switchTab}
                key={`table-type-item-${type.internal}`}
                enabled={!disabled}
                hideCounts={hideCounts}
                className={tabsClassName} />
        );
    });

    return (
        <div
            className="table-types"
            role="menu">
            {tabs}
        </div>
    );
};

ResultsTableTabs.propTypes = propTypes;
export default ResultsTableTabs;
