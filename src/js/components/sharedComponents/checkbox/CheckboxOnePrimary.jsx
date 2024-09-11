import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import RecipientTypeList from "../../search/filters/recipient/RecipientTypeList";

const propTypes = {
    category: PropTypes.array,
    expanded: PropTypes.bool,
    toggleExpanded: PropTypes.func,
    selectedTypes: PropTypes.array,
    toggleCheckboxType: PropTypes.func,
    filterTypes: PropTypes.array,
    bulkTypeChange: PropTypes.func,
    enableAnalytics: PropTypes.bool
};

const CheckboxOnePrimary = ({
    category,
    expanded,
    toggleExpanded,
    selectedTypes,
    toggleCheckboxType,
    filterTypes,
    bulkTypeChange,
    enableAnalytics = false
}) => {
    const [allChildren, setAllChildren] = useState(false);

    const primaryCheckbox = document.getElementById(`primary-checkbox__${category.id}`);

    const toggleChildren = () => {
        if (allChildren) {
            // all the children are selected, deselect them
            bulkTypeChange({
                lookupName: '',
                types: category.filters,
                direction: 'remove'
            });

            // Analytics
            if (enableAnalytics) {
                // logDeselectFilterEvent(name, filterType);
            }
        }
        else {
            // not all the children are selected, select them all
            bulkTypeChange({
                lookupName: '',
                types: category.filters,
                direction: 'add'
            });

            // Analytics
            if (enableAnalytics) {
                // logPrimaryTypeFilterEvent(
                //     name, filterType);
            }
        }
    };

    const compareFiltersToChildren = () => {
        let allSelected = true;
        let someSelected = false;

        for (const filter of category.filters) {
            if (!selectedTypes.has(filter)) {
                allSelected = false;
            }
            else {
                someSelected = true;
            }
        }

        if (!allSelected && someSelected) {
            primaryCheckbox.indeterminate = true;
        }

        setAllChildren(allSelected);
    };

    useEffect(() => {
        compareFiltersToChildren();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTypes]);

    return (
        <div className="checkbox-type-filter">
            <div
                className="checkbox-type-filter__heading"
                role="button"
                tabIndex="0">
                {!expanded?.includes(category.id) &&
                    <FontAwesomeIcon
                        onClick={() => toggleExpanded(category)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") toggleExpanded(category);
                        }}
                        icon="chevron-right" />}
                {expanded?.includes(category.id) &&
                    <FontAwesomeIcon
                        onClick={() => toggleExpanded(category)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") toggleExpanded(category);
                        }}
                        icon="chevron-down" />}
                <div className="checkbox-type-filter__header">
                    <input
                        type="checkbox"
                        onChange={toggleChildren}
                        checked={allChildren}
                        id={`primary-checkbox__${category.id}`} />
                    <span>{category.name}</span>
                    <span className="checkbox-type-filter__item-count">
                        {category.filters?.length}
                        {category.filters?.length === 1 ? 'type' : 'types'}
                    </span>
                </div>
            </div>
            <RecipientTypeList
                expanded={expanded?.includes(category.id)}
                selectedTypes={selectedTypes}
                category={category}
                toggleCheckboxType={toggleCheckboxType}
                recipientTypes={filterTypes} />
        </div>);
};

CheckboxOnePrimary.propTypes = propTypes;

export default CheckboxOnePrimary;
