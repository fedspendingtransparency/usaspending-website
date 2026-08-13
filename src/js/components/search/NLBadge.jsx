import React, { memo } from 'react';
import { useSelector } from "react-redux";
import getFilters from "../../containers/search/topFilterBar/getFilters";

// eslint-disable-next-line prefer-arrow-callback
const NLBadge = memo(function NLBadge() {
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);

    const { filterCount } =  getFilters(reduxFilters);

    if (filterCount === 0) return;

    return (
        <div className="sidebar-nl-buttons__badge">
            {filterCount > 99 ? "99+" : filterCount}
        </div>
    )
});

export default NLBadge;
