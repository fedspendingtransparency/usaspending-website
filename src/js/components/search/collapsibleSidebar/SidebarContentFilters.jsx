import React from 'react';
import { useSelector } from 'react-redux';
import { searchFilterCategoryTree } from 'dataMapping/search/searchFilterCategories';
import { getFilterCount } from 'helpers/search/filterCheckboxHelper';
import Keyword from 'components/search/filters/keyword/Keyword';
import SidebarContentFilterAccordion from './SidebarContentFilterAccordion';

const SidebarContentFilters = () => {
    const filters = useSelector((state) => state.filters);
    const filterCount = getFilterCount(filters);

    return (
        <div
            className="collapsible-sidebar--search-filters-list">
            <Keyword />
            {searchFilterCategoryTree.map(({ title, component, defaultOpen }) => (
                <SidebarContentFilterAccordion
                    title={title}
                    component={component}
                    count={filterCount[title]}
                    defaultOpen={defaultOpen}
                    key={`toggle-${title}`} />
            ))}
        </div>
    );
};

export default SidebarContentFilters;
