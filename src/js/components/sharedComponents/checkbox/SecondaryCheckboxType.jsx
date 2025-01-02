/**
 * SecondaryCheckboxType.jsx
 * Created by michaelbray on 5/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import Analytics from 'helpers/analytics/Analytics';

const propTypes = {
    id: PropTypes.string,
    code: PropTypes.string,
    name: PropTypes.string,
    lookupName: PropTypes.string,
    toggleCheckboxType: PropTypes.func,
    filterType: PropTypes.string,
    selectedCheckboxes: PropTypes.object,
    enableAnalytics: PropTypes.bool,
    restrictChildren: PropTypes.bool
};

const SecondaryCheckboxType = ({
    id = `checkbox-${uniqueId()}`,
    code,
    name,
    lookupName = '',
    toggleCheckboxType,
    filterType = '',
    selectedCheckboxes = new Set(),
    enableAnalytics = false,
    restrictChildren = false
}) => {
    const checked = selectedCheckboxes.includes(code);
    const elementId = `checkbox-${uniqueId()}`;

    const logSecondaryTypeFilterEvent = (type, filter) => {
        Analytics.event({
            event: 'search_checkbox_selection',
            category: 'Search Filter Interaction',
            action: `Selected Secondary ${filter} Type`,
            label: type,
            gtm: true
        });
    };

    const logDeselectFilterEvent = (type, filter) => {
        Analytics.event({
            event: 'search_checkbox_selection',
            category: 'Search Filter Interaction',
            action: `Deselected Secondary ${filter} Type`,
            label: type,
            gtm: true
        });
    };

    const toggleFilter = () => {
    // indicate to Redux that this field needs to toggle
        toggleCheckboxType({
            value: code,
            lookupName
        });

        // Analytics
        if (enableAnalytics) {
            if (selectedCheckboxes.includes(code)) {
                logDeselectFilterEvent(name,
                    filterType);
            }
            else {
                logSecondaryTypeFilterEvent(name,
                    filterType);
            }
        }
    };

    return (
        <li key={id} className="secondary-checkbox-type">
            <label
                className="checkbox-item-wrapper"
                htmlFor={elementId}>
                <input
                    type="checkbox"
                    id={elementId}
                    value={code}
                    checked={checked}
                    onChange={toggleFilter}
                    disabled={restrictChildren} />
                <span className="checkbox-item-label">
                    {name}
                </span>
            </label>
        </li>
    );
};

SecondaryCheckboxType.propTypes = propTypes;

export default SecondaryCheckboxType;
