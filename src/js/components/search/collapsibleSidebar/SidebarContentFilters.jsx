import React from 'react';
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { searchFilterCategoryTree } from "dataMapping/search/searchFilterCategories";
import { getFilterCount } from "helpers/search/filterCheckboxHelper";
import Keyword from "components/search/filters/keyword/Keyword";
import SidebarContentFilterAccordion from "./SidebarContentFilterAccordion";

const propTypes = {
    isMobile: PropTypes.bool
};

const SidebarContentFilters = ({ isMobile }) => {
    const filters = useSelector((state) => state.filters);
    const filterCount = getFilterCount(filters);

    return (
        <div
            className="collapsible-sidebar--search-filters-list">
            <Keyword />
            {searchFilterCategoryTree.map(({ title, component }) => (
                <SidebarContentFilterAccordion
                    key={`toggle-${title}`}
                    title={title}
                    component={component}
                    count={filterCount[title]}
                    isMobile={isMobile} />
            ))}
        </div>
    );
};

SidebarContentFilters.propTypes = propTypes;
export default SidebarContentFilters;
