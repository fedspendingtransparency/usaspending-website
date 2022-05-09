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
    restrictChildren: PropTypes.bool,
    isCollapsable: PropTypes.bool
};

const defaultProps = {
    id: `checkbox-${uniqueId()}`,
    lookupName: '',
    filterType: '',
    selectedCheckboxes: new Set(),
    enableAnalytics: false,
    restrictChildren: false,
    isCollapsable: true
};

export default class SecondaryCheckboxType extends React.Component {
    static logSecondaryTypeFilterEvent(type, filter) {
        Analytics.event({
            category: 'Search Filter Interaction',
            action: `Selected Secondary ${filter} Type`,
            label: type
        });
    }

    static logDeselectFilterEvent(type, filter) {
        Analytics.event({
            category: 'Search Filter Interaction',
            action: `Deselected Secondary ${filter} Type`,
            label: type
        });
    }

    constructor(props) {
        super(props);
        // bind functions
        this.toggleFilter = this.toggleFilter.bind(this);
    }

    toggleFilter() {
    // indicate to Redux that this field needs to toggle
        this.props.toggleCheckboxType({
            value: this.props.code,
            lookupName: this.props.lookupName
        });

        // Analytics
        if (this.props.enableAnalytics) {
            const checked = this.props.selectedCheckboxes.includes(this.props.code);
            if (checked) {
                SecondaryCheckboxType.logDeselectFilterEvent(this.props.name,
                    this.props.filterType);
            }
            else {
                SecondaryCheckboxType.logSecondaryTypeFilterEvent(this.props.name,
                    this.props.filterType);
            }
        }
    }

    render() {
        const checked = this.props.selectedCheckboxes.includes(this.props.code);
        const elementId = `checkbox-${uniqueId()}`;
        return (
            <li key={this.props.id} className="secondary-checkbox-type">
                <label
                    className="checkbox-item-wrapper"
                    htmlFor={elementId}>
                    <input
                        type="checkbox"
                        id={elementId}
                        value={this.props.code}
                        checked={checked}
                        onChange={this.toggleFilter}
                        disabled={this.props.restrictChildren} />
                    <span className="checkbox-item-label">
                        {this.props.name}
                    </span>
                </label>
            </li>
        );
    }
}

SecondaryCheckboxType.propTypes = propTypes;
SecondaryCheckboxType.defaultProps = defaultProps;
