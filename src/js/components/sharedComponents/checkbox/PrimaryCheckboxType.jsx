/**
 * PrimaryCheckboxType.jsx
 * Created by michaelbray on 5/17/17.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Set } from 'immutable';
import { uniqueId } from 'lodash';

import Analytics from 'helpers/analytics/Analytics';

import SecondaryCheckboxType from './SecondaryCheckboxType';
import CollapsedCheckboxType from './CollapsedCheckboxType';
import SingleCheckboxType from './SingleCheckboxType';

const propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    lookupName: PropTypes.string,
    filters: PropTypes.array,
    bulkTypeChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    filterType: PropTypes.string,
    types: PropTypes.object,
    selectedCheckboxes: PropTypes.object,
    enableAnalytics: PropTypes.bool,
    restrictChildren: PropTypes.bool,
    isCollapsable: PropTypes.bool,
    toggleCheckboxType: PropTypes.func
};

// sub-filters hidden from the user, but  passed to the API when the parent filter is selected
const excludedSubFilters = ["IDV_B"];

const PrimaryCheckboxType = ({
    id,
    name = '',
    lookupName = '',
    filters = [],
    value = '',
    filterType = '',
    types = {},
    selectedCheckboxes = new Set(),
    enableAnalytics = false,
    restrictChildren = false,
    isCollapsable = true,
    bulkTypeChange,
    toggleCheckboxType
}) => {
    const [showSubItems, setShowSubItems] = useState(false);
    const [arrowState, setArrowState] = useState('collapsed');
    const [selectedChildren, setSelectedChildren] = useState(false);
    const [allChildren, setAllChildren] = useState(false);

    const logPrimaryTypeFilterEvent = (type, filter) => {
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

    const compareFiltersToChildren = () => {
        // check to see if the children are all selected or not
        let allSelected = true;
        let someSelected = false;

        for (const code of filters) {
            if (!selectedCheckboxes.has(code)) {
                allSelected = false;
            }
            else {
                someSelected = true;
            }
        }

        // auto-expand when some but not all children are selected
        let tempShowSubItems = showSubItems;
        if (!allSelected && someSelected) {
            tempShowSubItems = true;
        }

        setShowSubItems(tempShowSubItems);
        setAllChildren(allSelected);
        setSelectedChildren(someSelected);
    };

    const toggleSubItems = () => {
        const newShowState = !showSubItems;
        let newArrowState = 'collapsed';
        if (newShowState) {
            newArrowState = 'expanded';
        }

        setShowSubItems(newShowState);
        setArrowState(newArrowState);
    };

    const toggleChildren = () => {
        if (allChildren) {
            // all the children are selected, deselect them
            bulkTypeChange({
                lookupName,
                types: filters,
                direction: 'remove'
            });

            // Analytics
            if (enableAnalytics) {
                logDeselectFilterEvent(name, filterType);
            }
        }
        else {
            // not all the children are selected, select them all
            bulkTypeChange({
                lookupName,
                types: filters,
                direction: 'add'
            });

            // Analytics
            if (enableAnalytics) {
                logPrimaryTypeFilterEvent(name, filterType);
            }
        }
    };

    let primaryTypes = (<CollapsedCheckboxType
        toggleExpand={toggleSubItems}
        toggleChildren={toggleChildren}
        name={name}
        selected={allChildren}
        hideArrow={selectedChildren || restrictChildren}
        arrowState={arrowState}
        isCollapsable={isCollapsable} />);

    let secondaryTypes = null;

    if (showSubItems || !isCollapsable) {
        secondaryTypes = filters
            .filter((subFilter) => !excludedSubFilters.includes(subFilter))
            .map((code) => (
                <SecondaryCheckboxType
                    id={`secondary-checkbox-${uniqueId()}`}
                    code={code}
                    name={types[code]}
                    lookupName={lookupName}
                    toggleCheckboxType={toggleCheckboxType}
                    filterType={filterType}
                    selectedCheckboxes={selectedCheckboxes}
                    enableAnalytics={enableAnalytics}
                    restrictChildren={restrictChildren}
                    key={`${id} - ${code}`} />
            ));
    }

    if (filters.length === 0) {
        primaryTypes = (<SingleCheckboxType
            name={name}
            toggleCheckboxType={toggleCheckboxType}
            filterType={filterType}
            selectedCheckboxes={selectedCheckboxes}
            enableAnalytics={enableAnalytics}
            value={value}
            code={value}
            key={`${id} - ${value}`}
            id={`primary-checkbox-${uniqueId()}`} />);
    }

    useEffect(() => {
        compareFiltersToChildren();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCheckboxes]);

    return (
        <li className="checkbox-set">
            <div className="primary-checkbox">
                {primaryTypes}
            </div>
            <ul className="secondary-checkbox-set">
                {secondaryTypes}
            </ul>
        </li>
    );
};

PrimaryCheckboxType.propTypes = propTypes;

export default PrimaryCheckboxType;
