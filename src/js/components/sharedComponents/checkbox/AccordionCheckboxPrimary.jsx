/**
 * AccordionCheckboxPrimary.jsx
 * Created by Josue Aguilar on 09/05/2024.
 */

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import Analytics from 'helpers/analytics/Analytics';

import AccordionCheckboxSecondary from "./AccordionCheckboxSecondary";

const propTypes = {
    category: PropTypes.object,
    expandedCategories: PropTypes.array,
    toggleExpanded: PropTypes.func,
    selectedFilters: PropTypes.object,
    singleFilterChange: PropTypes.func,
    filters: PropTypes.object,
    bulkFilterChange: PropTypes.func,
    enableAnalytics: PropTypes.bool,
    customLabels: PropTypes.object
};

const AccordionCheckboxPrimary = ({
    category,
    expandedCategories,
    toggleExpanded,
    selectedFilters,
    singleFilterChange,
    filters,
    customLabels,
    bulkFilterChange,
    enableAnalytics = false
}) => {
    const [allChildren, setAllChildren] = useState(false);

    const primaryCheckbox = document.getElementById(`primary-checkbox__${category.id}`);
    const count = category.id === 'indefinite-delivery-vehicle' ? category.filters?.length - 1 : category.filters?.length;

    const logPrimaryFilterEvent = (type, filter) => {
        Analytics.event({
            event: 'search_checkbox_selection',
            category: 'Search Filter Interaction',
            action: `Selected ${filter} Type`,
            label: type,
            gtm: true
        });
    };

    const logDeselectFilterEvent = (type, filter) => {
        Analytics.event({
            event: 'search_checkbox_selection',
            category: 'Search Filter Interaction',
            action: `Deselected ${filter} Type Children`,
            label: type,
            gtm: true
        });
    };

    const toggleChildren = () => {
        if (allChildren) {
            // all the children are selected, deselect them
            bulkFilterChange({
                lookupName: '',
                types: category.filters,
                direction: 'remove'
            });

            // Analytics
            if (enableAnalytics) {
                logDeselectFilterEvent(category.id, category.name);
            }
        }
        else {
            // not all the children are selected, select them all
            bulkFilterChange({
                lookupName: '',
                types: category.filters,
                direction: 'add'
            });

            // Analytics
            if (enableAnalytics) {
                logPrimaryFilterEvent(category.id, category.name);
            }
        }
    };

    const compareFiltersToChildren = () => {
        let allSelected = true;
        let someSelected = false;

        for (const filter of category.filters) {
            if (!selectedFilters.has(filter)) {
                allSelected = false;
            }
            else {
                someSelected = true;
            }
        }

        if (primaryCheckbox) {
            if (!allSelected && someSelected) {
                primaryCheckbox.indeterminate = true;
            }
            else if (primaryCheckbox?.indeterminate) {
                primaryCheckbox.indeterminate = false;
            }
        }

        setAllChildren(allSelected);
    };

    useEffect(() => {
        compareFiltersToChildren();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilters]);

    return (
        <div className="checkbox-filter__wrapper">
            <div
                className="checkbox-filter__header accordion-checkbox"
                role="button"
                tabIndex="0">
                <div className="checkbox-filter__header-icon">
                    {!expandedCategories?.includes(category.id) &&
                    <FontAwesomeIcon
                        onClick={() => toggleExpanded(category)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") toggleExpanded(category);
                        }}
                        tabIndex={0}
                        icon="chevron-right" />}
                    {expandedCategories?.includes(category.id) &&
                    <FontAwesomeIcon
                        onClick={() => toggleExpanded(category)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") toggleExpanded(category);
                        }}
                        tabIndex={0}
                        icon="chevron-down" />}
                </div>
                <input
                    type="checkbox"
                    onChange={toggleChildren}
                    checked={allChildren}
                    id={`primary-checkbox__${category.id}`} />
                <div className="checkbox-filter__header-label-container">
                    <span className="checkbox-filter__header-label accordion-checkbox">{category.name}</span>
                    <span className="checkbox-filter__header-count">
                        {count}{' '}
                        {count === 1 ? 'type' : 'types'}
                    </span>
                </div>
            </div>
            <AccordionCheckboxSecondary
                expanded={expandedCategories?.includes(category.id)}
                selectedFilters={selectedFilters}
                category={category}
                singleFilterChange={singleFilterChange}
                filters={filters}
                customLabels={customLabels} />
        </div>);
};

AccordionCheckboxPrimary.propTypes = propTypes;

export default AccordionCheckboxPrimary;
