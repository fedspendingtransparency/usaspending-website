import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Set } from 'immutable';

import RecipientTypeList from "../../search/filters/recipient/RecipientTypeList";

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
    toggleCheckboxType: PropTypes.func
};

const defaultProps = {
    filterTypeMapping: [],
    selectedTypes: new Set()
};

const CheckboxOne = ({
    filterTypes, filterTypeMapping, selectedTypes, toggleCheckboxType
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
        <div className="checkbox-type-filter">
            <div
                className="checkbox-type-filter__heading"
                onClick={() => toggleExpanded(category)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") toggleExpanded(category);
                }}
                role="button"
                tabIndex="0">
                {!expanded?.includes(category.id) && <FontAwesomeIcon icon="chevron-right" />}
                {expanded?.includes(category.id) && <FontAwesomeIcon icon="chevron-down" />}
                <div className="checkbox-type-filter__header">
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
        </div>));

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
