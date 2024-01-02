/**
 * SingleCheckboxType.jsx
 * Created by michaelbray on 5/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import Analytics from 'helpers/analytics/Analytics';

const propTypes = {
    id: PropTypes.string,
    code: PropTypes.string,
    name: PropTypes.string,
    toggleCheckboxType: PropTypes.func,
    filterType: PropTypes.string,
    selectedCheckboxes: PropTypes.object,
    enableAnalytics: PropTypes.bool
};

const defaultProps = {
    id: '',
    filterType: '',
    enableAnalytics: false
};

export default class SingleCheckboxType extends React.Component {
    static logSingleTypeFilterEvent(type, filter) {
        Analytics.event({
            event: 'search_checkbox_selection',
            category: 'Search Filter Interaction',
            action: `Selected ${filter} Type`,
            label: type,
            gtm: true
        });
    }

    static logDeselectSingleTypeFilterEvent(type, filter) {
        Analytics.event({
            event: 'search_checkbox_selection',
            category: 'Search Filter Interaction',
            action: `Deselected ${filter} Type`,
            label: type,
            gtm: true
        });
    }

    constructor(props) {
        super(props);

        // Bind functions
        this.toggleFilter = this.toggleFilter.bind(this);
        this.value = this.props.code || this.props.value;
    }

    toggleFilter() {
    // Analytics
        if (this.props.enableAnalytics) {
            if (this.props.selectedCheckboxes.has(this.value)) {
                // already checked, log deselect event
                SingleCheckboxType.logDeselectSingleTypeFilterEvent(this.props.name, this.props.filterType);
            }
            else {
                // not already checked, log select event
                SingleCheckboxType.logSingleTypeFilterEvent(this.props.name, this.props.filterType);
            }
        }

        // indicate to Redux that this field needs to toggle
        this.props.toggleCheckboxType({ value: this.value });
    }

    render() {
        const checked = this.props.selectedCheckboxes.has(this.value);
        const elementId = `checkbox-${uniqueId()}`;
        return (
            <div className="primary-checkbox-type single-item">
                <div className="primary-checkbox-wrapper">
                    <label
                        className="checkbox-item-wrapper"
                        htmlFor={elementId}>
                        <input
                            type="checkbox"
                            id={elementId}
                            value={this.value}
                            checked={checked}
                            onChange={this.toggleFilter} />
                        <span className="checkbox-item-label">
                            {this.props.name}
                        </span>
                    </label>
                </div>
            </div>
        );
    }
}

SingleCheckboxType.propTypes = propTypes;
SingleCheckboxType.defaultProps = defaultProps;
