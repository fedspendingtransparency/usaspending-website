import React from 'react';
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import getFilters from "../../containers/search/topFilterBar/getFilters";

const propTypes = { color: PropTypes.string }

const NLBadge = ({ color }) => {
    const reduxFilters = useSelector((state) => state.filters);

    const { filterCount } =  getFilters(reduxFilters);

    if (filterCount === 0) return;

    return (
        <div className="sidebar-filter-badge" style={{ color }}>
            {filterCount}
        </div>
    )
}

NLBadge.propTypes = propTypes;
export default NLBadge;
