/**
 * AccordionCheckbox.jsx
 * Created by Josue Aguilar on 09/05/2024.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { throttle } from "lodash";
import AccordionCheckboxPrimary from "./AccordionCheckboxPrimary";
import EntityDropdownAutocomplete from "../../search/filters/location/EntityDropdownAutocomplete";

const expandCheckboxCategoryAccordions = (filterCategoryMapping, selectedFilters) => {
    const toExpand = [];
    filterCategoryMapping?.forEach((category) => {
        category?.filters?.forEach((type) => {
            if (selectedFilters?.has(type)) {
                toExpand.push(category.id);
            }
        });
    });

    return toExpand;
};

const propTypes = {
    filters: PropTypes.object,
    filterCategoryMapping: PropTypes.arrayOf(PropTypes.object),
    selectedFilters: PropTypes.object,
    singleFilterChange: PropTypes.func,
    bulkFilterChange: PropTypes.func,
    customLabels: PropTypes.object
};

const AccordionCheckbox = ({
    filters, customLabels, filterCategoryMapping = [], selectedFilters, singleFilterChange, bulkFilterChange, selectedCategory, isExpanded
}) => {
    const [searchString, setSearchString] = useState('');
    const [filterCategory, setFilterCategory] = useState(filterCategoryMapping);
    const [noResults, setNoResults] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState(
        expandCheckboxCategoryAccordions(filterCategoryMapping, selectedFilters)
    );

    const selectedItemHeight = document.querySelector('.selected-category-item')?.offsetHeight;
    // subtracting to account for input box/margin/title header
    const [innerDivHeight, setInnerDivHeight] = useState(selectedItemHeight - 66);

    const toggleExpanded = (category) => {
        const containsId = expandedCategories?.indexOf(category.id);
        if (containsId <= -1) {
            setExpandedCategories([...expandedCategories, category.id]);
        }
        else {
            setExpandedCategories(expandedCategories.filter((item) => item !== category.id));
        }
    };

    useEffect(() => {
        if (isExpanded) {
            const category = filterCategoryMapping.find((item) => item.id === selectedCategory);
            toggleExpanded(category);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterCategoryMapping, isExpanded, selectedCategory]);

    const handleTextInputChange = (e) => {
        setSearchString(e.target.value);
    };

    const onClear = () => {
        setExpandedCategories([]);
        setSearchString('');
    };

    useEffect(() => {
        const handleScroll = throttle(() => {
            const innerWrapper = document.querySelector('.checkbox-categories-wrapper');
            const submitButton = document.querySelector('.sidebar-submit');
            const innerHeight = innerWrapper?.offsetHeight;
            const submitButtonRect = submitButton?.getBoundingClientRect();
            // subtracting to account for submit button container, about this filter container
            if (innerWrapper.getBoundingClientRect().bottom > (submitButtonRect.top - 51)) {
                setInnerDivHeight(innerHeight - 52 - 100);
            } else {
                // set to original
                setInnerDivHeight(selectedItemHeight);
            }
        }, 200);
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [innerDivHeight]);


    const searchCategoryMapping = () => {
        // filter out definitions based on search text
        // eslint-disable-next-line no-unused-vars
        const filteredDefinitions = Object.fromEntries(Object.entries(filters).filter(([key, value]) => value.toLowerCase().includes(searchString.toLowerCase())));

        // filter out type mapping filters based on filteredDefinitions
        const filteredFilters = filterCategoryMapping.map((type) => ({
            ...type,
            filters: type.filters.filter((v) => Object.keys(filteredDefinitions).includes(v))
        }));

        // remove any categories that do not have any filters left
        const filteredCategories = filteredFilters.filter((type) => type.filters.length > 0);

        if (filteredCategories.length > 0) {
            setNoResults(false);
        }
        else {
            setNoResults(true);
        }

        setFilterCategory(filteredCategories);
    };

    useEffect(() => {
        searchCategoryMapping();
        if (searchString) {
            const categoryIds = filterCategory.map((category) => category.id);
            setExpandedCategories(categoryIds);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString]);

    const checkboxCategories = filterCategory.map((category) => (
        <AccordionCheckboxPrimary
            category={category}
            singleFilterChange={singleFilterChange}
            filters={filters}
            selectedFilters={selectedFilters}
            customLabels={customLabels}
            expandedCategories={expandedCategories}
            toggleExpanded={toggleExpanded}
            bulkFilterChange={bulkFilterChange}
            key={category.id} />
    ));

    return (
        <div className="filter-item-wrap">
            <EntityDropdownAutocomplete
                placeholder="Search filters..."
                searchString={searchString}
                enabled
                handleTextInputChange={handleTextInputChange}
                context={{}}
                loading={false}
                isClearable
                onClear={onClear}
                searchIcon />
            {noResults ?
                <div className="no-results">No results found.</div>
                :
                <div className="checkbox-categories-wrapper" style={{ height: "400px" }}>
                    {/* style={{ height: innerDivHeight }} */}
                    {checkboxCategories}
                </div>
            }
        </div>
    );
};

AccordionCheckbox.propTypes = propTypes;

export default AccordionCheckbox;
