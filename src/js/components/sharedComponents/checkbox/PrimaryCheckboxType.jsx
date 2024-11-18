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
    id: PropTypes.string || PropTypes.element,
    name: PropTypes.string,
    lookupName: PropTypes.string,
    filters: PropTypes.array,
    bulkTypeChange: PropTypes.func,
    value: PropTypes.string || PropTypes.object,
    filterType: PropTypes.string,
    types: PropTypes.object,
    selectedCheckboxes: PropTypes.object,
    enableAnalytics: PropTypes.bool,
    restrictChildren: PropTypes.bool,
    isCollapsable: PropTypes.bool
};

const defaultProps = {
    name: '',
    lookupName: '',
    filters: [],
    value: '',
    filterType: '',
    types: {},
    selectedCheckboxes: new Set(),
    enableAnalytics: false,
    restrictChildren: false,
    isCollapsable: true
};

// sub-filters hidden from the user, but  passed to the API when the parent filter is selected
const excludedSubFilters = ["IDV_B"];

const PrimaryCheckboxType = (props) => {
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

        for (const code of props.filters) {
            if (!props.selectedCheckboxes.has(code)) {
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
            props.bulkTypeChange({
                lookupName: props.lookupName,
                types: props.filters,
                direction: 'remove'
            });

            // Analytics
            if (props.enableAnalytics) {
                logDeselectFilterEvent(props.name, props.filterType);
            }
        }
        else {
            // not all the children are selected, select them all
            props.bulkTypeChange({
                lookupName: props.lookupName,
                types: props.filters,
                direction: 'add'
            });

            // Analytics
            if (props.enableAnalytics) {
                logPrimaryTypeFilterEvent(
                    props.name, props.filterType);
            }
        }
    };

    let primaryTypes = (<CollapsedCheckboxType
        id={props.id}
        name={props.name}
        code={props.value}
        selected={allChildren}
        arrowState={arrowState}
        toggleExpand={toggleSubItems}
        toggleChildren={toggleChildren}
        hideArrow={selectedChildren || props.restrictChildren}
        isCollapsable={props.isCollapsable} />);

    let secondaryTypes = null;

    if (showSubItems || !props.isCollapsable) {
        secondaryTypes = props.filters
            .filter((subFilter) => !excludedSubFilters.includes(subFilter))
            .map((code) => (
                <SecondaryCheckboxType
                    {...props}
                    code={code}
                    name={props.types[code]}
                    key={`${props.id} - ${code}`}
                    id={`secondary-checkbox-${uniqueId()}`} />
            ));
    }

    if (props.filters.length === 0) {
        primaryTypes = (<SingleCheckboxType
            {...props}
            code={props.value}
            name={props.name}
            key={`${props.id} - ${props.value}`}
            id={`primary-checkbox-${uniqueId()}`} />);
    }

    useEffect(() => {
        compareFiltersToChildren();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectedCheckboxes]);

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
PrimaryCheckboxType.defaultProps = defaultProps;

export default PrimaryCheckboxType;
