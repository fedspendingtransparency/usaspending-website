/**
  * TopFilterBar.jsx
  * Created by Kevin Li 12/13/16
  *
  * TopFilterBar is a React component that creates the sticky filter bar at the top of the search
  * results page. It receives parsed filter groups from its parent Redux container.
  *
  * @extends React.Component
  **/

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TopFilterGroupGenerator from './TopFilterGroupGenerator';
import BarHeader from "./header/BarHeader";

const propTypes = {
    filters: PropTypes.array,
    filterCount: PropTypes.number
};

// eslint-disable-next-line prefer-arrow-callback
const TopFilterBar = memo(function TopFilterBar({ filters, filterCount }) {
    const [expandedFilters, setExpandedFilters] = useState(false);
    const newAwardsOnlyPresent = filters.find(({ code }) => code === 'newAwardsOnly');

    const groups = filters.map(({ code, name }) => (
        <TopFilterGroupGenerator code={code} name={name} />
    ));

    return (
        <div>
            <div
                className="search-top-filter-bar"
                role="complementary"
                aria-label="Currently applied search filters">
                <BarHeader
                    filterCount={filterCount}
                    expandedFilters={expandedFilters}
                    setExpandedFilters={setExpandedFilters} />
                <div className="search-top-filters">
                    <div
                        className={`search-top-filters-content ${
                            newAwardsOnlyPresent ? 'newAwardsOnlyPresent' : ''
                        }`}>
                        {groups}
                    </div>
                </div>
            </div>
        </div>
    );
});

TopFilterBar.propTypes = propTypes;

export default TopFilterBar;
