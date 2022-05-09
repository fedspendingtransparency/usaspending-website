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
            category: 'Search Filter Interaction',
            action: `Selected ${filter} Type`,
            label: type
        });
    }

    static logDeselectSingleTypeFilterEvent(type, filter) {
        Analytics.event({
            category: 'Search Filter Interaction',
            action: `Deselected ${filter} Type`,
            label: type
        });
    }

    constructor(props) {
        super(props);

        // Bind functions
        this.toggleFilter = this.toggleFilter.bind(this);
    }

    toggleFilter() {
    // Analytics
        if (this.props.enableAnalytics) {
            if (this.props.selectedCheckboxes.has(this.props.code)) {
                // already checked, log deselect event
                SingleCheckboxType.logDeselectSingleTypeFilterEvent(this.props.name, this.props.filterType);
            }
            else {
                // not already checked, log select event
                SingleCheckboxType.logSingleTypeFilterEvent(this.props.name, this.props.filterType);
            }
        }

        // indicate to Redux that this field needs to toggle
        this.props.toggleCheckboxType({ value: this.props.code });
    }

    render() {
        const checked = this.props.selectedCheckboxes.has(this.props.code);
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
                            value={this.props.code}
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
