import React from "react";
import PropTypes from "prop-types";

import BarHeaderAbove from "./BarHeaderAbove";
import BarHeaderBelow from "./BarHeaderBelow";

const propTypes = {
    filterCount: PropTypes.number,
    expandedFilters: PropTypes.bool,
    setExpandedFilters: PropTypes.func
};

const BarHeader = ({ filterCount, expandedFilters, setExpandedFilters }) => (
    <div className="search-top-filter-header advanced-search">
        <BarHeaderAbove />
        <BarHeaderBelow
            filterCount={filterCount}
            expandedFilters={expandedFilters}
            setExpandedFilters={setExpandedFilters} />
    </div>
);

BarHeader.propTypes = propTypes;
export default BarHeader;
