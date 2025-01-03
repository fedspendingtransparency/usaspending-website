/**
 * SingleCheckboxType.jsx
 * Created by michaelbray on 5/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import Analytics from 'helpers/analytics/Analytics';

const propTypes = {
    code: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    toggleCheckboxType: PropTypes.func,
    filterType: PropTypes.string,
    selectedCheckboxes: PropTypes.object,
    enableAnalytics: PropTypes.bool
};

const SingleCheckboxType = ({
    code,
    value,
    name,
    toggleCheckboxType,
    filterType = '',
    selectedCheckboxes,
    enableAnalytics = false
}) => {
    const checkboxValue = code || value;

    const logSingleTypeFilterEvent = (type, filter) => {
        Analytics.event({
            event: 'search_checkbox_selection',
            category: 'Search Filter Interaction',
            action: `Selected ${filter} Type`,
            label: type,
            gtm: true
        });
    };

    const logDeselectSingleTypeFilterEvent = (type, filter) => {
        Analytics.event({
            event: 'search_checkbox_selection',
            category: 'Search Filter Interaction',
            action: `Deselected ${filter} Type`,
            label: type,
            gtm: true
        });
    };

    const toggleFilter = () => {
    // Analytics
        if (enableAnalytics) {
            if (selectedCheckboxes.has(checkboxValue)) {
                // already checked, log deselect event
                logDeselectSingleTypeFilterEvent(name, filterType);
            }
            else {
                // not already checked, log select event
                logSingleTypeFilterEvent(name, filterType);
            }
        }

        // indicate to Redux that this field needs to toggle
        toggleCheckboxType({ value: checkboxValue });
    };

    const elementId = `checkbox-${uniqueId()}`;
    let checked;

    // if statement specifically for recipient filter checkboxes
    if (typeof checkboxValue === "object" && (
        selectedCheckboxes.has(checkboxValue.name) ||
        selectedCheckboxes.has(checkboxValue.duns) ||
        selectedCheckboxes.has(checkboxValue.uei)
    )) {
        checked = true;
    }
    else if (typeof checkboxValue === "object") {
        checked = false;
    }
    else {
        checked = selectedCheckboxes.has(checkboxValue);
    }

    return (
        <div className="primary-checkbox-type single-item">
            <div className="primary-checkbox-wrapper">
                <label
                    className="checkbox-item-wrapper"
                    htmlFor={elementId}>
                    <input
                        type="checkbox"
                        id={elementId}
                        value={checkboxValue}
                        checked={checked}
                        onChange={toggleFilter} />
                    <span className="checkbox-item-label">
                        {name}
                    </span>
                </label>
            </div>
        </div>
    );
};

SingleCheckboxType.propTypes = propTypes;

export default SingleCheckboxType;
