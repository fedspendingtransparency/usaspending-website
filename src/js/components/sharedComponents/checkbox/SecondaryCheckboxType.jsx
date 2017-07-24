/**
 * SecondaryCheckboxType.jsx
 * Created by michaelbray on 5/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

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
    filterType: '',
    selectedCheckboxes: new Set(),
    enableAnalytics: false
};

const ga = require('react-ga');

export default class SecondaryCheckboxType extends React.Component {
    static logSecondaryTypeFilterEvent(type, filter) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: `Selected Secondary ${filter} Type`,
            label: type
        });
    }

    static logDeselectFilterEvent(type, filter) {
        ga.event({
            category: 'Search Page Filter Applied',
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
        this.props.toggleCheckboxType(this.props.code);

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
        return (
            <li key={this.props.id} className="secondary-checkbox-type sub-list">
                <div className="checkbox-type-item-wrapper">
                    <input
                        type="checkbox"
                        id={this.props.id}
                        value={this.props.code}
                        checked={checked}
                        onChange={this.toggleFilter} />
                    <label htmlFor={this.props.id}>{this.props.name}</label>
                </div>
            </li>
        );
    }
}

SecondaryCheckboxType.propTypes = propTypes;
SecondaryCheckboxType.defaultProps = defaultProps;
