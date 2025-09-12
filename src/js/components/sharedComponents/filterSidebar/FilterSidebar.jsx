/**
 * FilterSidebar.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';
import PropTypes, { arrayOf, oneOfType } from 'prop-types';

import FilterOption from './FilterOption';

const propTypes = {
    options: arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        tooltip: PropTypes.element
    })),
    components: arrayOf(oneOfType([PropTypes.func, PropTypes.object])),
    expanded: arrayOf(PropTypes.bool),
    accessories: arrayOf(PropTypes.func),
    glossaryEntries: arrayOf(PropTypes.string)
};

const FilterSidebar = ({
    options = [],
    components = [],
    expanded = [],
    accessories = [],
    glossaryEntries = []
}) => {
    const optionsList = options
        .map((obj) => ({
            title: obj.title,
            tooltip: obj.tooltip || null
        }))
        .map(({ title, tooltip }, i) => {
            const component = components[i];
            const accessory = accessories[i];
            const glossarySlug = glossaryEntries[i];
            return (<FilterOption
                name={title}
                tooltip={tooltip}
                key={title}
                component={component}
                accessory={accessory}
                defaultExpand={expanded[i]}
                disabled={component === null}
                glossarySlug={glossarySlug} />);
        });

    return (
        <div className="search-filters-wrapper">
            {optionsList}
        </div>
    );
};

FilterSidebar.propTypes = propTypes;
export default FilterSidebar;
