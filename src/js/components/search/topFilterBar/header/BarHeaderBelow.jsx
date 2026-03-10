import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import RemoveFiltersButton from "./RemoveFiltersButton";
import ExpandFiltersButton from "./ExpandFiltersButton";

const propTypes = {
    filterCount: PropTypes.number,
    expandedFilters: PropTypes.bool,
    setExpandedFilters: PropTypes.func
};

const BarHeaderBelow = ({ filterCount, expandedFilters, setExpandedFilters }) => {
    const appliedFilters = useSelector((state) => state.appliedFilters.filters);

    const filterCountCopy = `${filterCount} Active Filter${filterCount !== 1 ? 's' : ''}:`;

    return (
        <div className="below-line">
            <h2
                className="header-title"
                id="top-filter-bar-title">
                {filterCountCopy}
            </h2>
            <div className="filter-buttons">
                <RemoveFiltersButton appliedFilters={appliedFilters} />
                <ExpandFiltersButton
                    appliedFilters={appliedFilters}
                    expandedFilters={expandedFilters}
                    setExpandedFilters={setExpandedFilters} />
            </div>
        </div>
    );
};

BarHeaderBelow.propTypes = propTypes;
export default BarHeaderBelow;
