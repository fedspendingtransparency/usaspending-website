import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RecipientTypeList from "components/search/filters/recipient/RecipientTypeList";

const expandCheckboxTypeAccordions = (checkboxTypeMapping, selectedTypes) => {
    const toExpand = [];
    checkboxTypeMapping.forEach((category) => {
        category.filters.forEach((type) => {
            if (selectedTypes.has(type)) {
                toExpand.push(category.id);
            }
        });
    });

    return toExpand;
};

const propTypes = {
    filterTypes: PropTypes.object,
    filterTypeMapping: PropTypes.arrayOf(PropTypes.object),
    selectedTypes: PropTypes.object,
    toggleCheckboxType: PropTypes.func,
    bulkTypeChange: PropTypes.func
};

const defaultProps = {
    filterTypeMapping: []
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

    const toggleChildren = () => {
        console.log('category: ', category);
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
                    <input type="checkbox" onChange={toggleChildren} />
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

const CheckboxOne = ({
    filterTypes, filterTypeMapping, selectedTypes, toggleCheckboxType, bulkTypeChange
}) => {
    const [expanded, setExpanded] = useState(
        expandCheckboxTypeAccordions(filterTypeMapping, selectedTypes)
    );

    const toggleExpanded = (category) => {
        const containsId = expanded?.indexOf(category.id);
        if (containsId <= -1) {
            setExpanded([...expanded, category.id]);
        }
        else {
            setExpanded(expanded.filter((item) => item !== category.id));
        }
    };

    const checkboxTypes = filterTypeMapping.map((category) => (
        <CheckboxOnePrimary
            category={category}
            toggleCheckboxType={toggleCheckboxType}
            filterTypes={filterTypes}
            selectedTypes={selectedTypes}
            expanded={expanded}
            toggleExpanded={toggleExpanded}
            bulkTypeChange={bulkTypeChange} />
    ));

    return (
        <div className="filter-item-wrap">
            <div className="checkbox-filter">
                <ul className="checkbox-types">
                    {checkboxTypes}
                </ul>
            </div>
        </div>
    );
};

CheckboxOne.propTypes = propTypes;
CheckboxOne.defaultProps = defaultProps;

export default CheckboxOne;
