/**
 * SingleCheckboxType.jsx
 * Created by michaelbray on 5/18/17.
 */

import React from 'react';

const propTypes = {
    id: React.PropTypes.string,
    code: React.PropTypes.string,
    name: React.PropTypes.string,
    toggleCheckboxType: React.PropTypes.func,
    filterType: React.PropTypes.string,
    selectedCheckboxes: React.PropTypes.object,
    enableAnalytics: React.PropTypes.bool
};

const defaultProps = {
    filterType: '',
    enableAnalytics: false
};

const ga = require('react-ga');

export default class SingleCheckboxType extends React.Component {
    static logSingleTypeFilterEvent(type, filter) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: `Selected ${filter} Type`,
            label: type
        });
    }

    constructor(props) {
        super(props);

        // Bind functions
        this.toggleFilter = this.toggleFilter.bind(this);
    }

    toggleFilter() {
        // indicate to Redux that this field needs to toggle
        this.props.toggleCheckboxType(this.props.code);

        // Analytics
        if (this.props.enableAnalytics) {
            SingleCheckboxType.logSingleTypeFilterEvent(this.props.name, this.props.filterType);
        }
    }

    render() {
        const checked = this.props.selectedCheckboxes.includes(this.props.code);

        return (
            <div className="primary-checkbox-type single-item">
                <div className="checkbox-type-item-wrapper">
                    <input
                        type="checkbox"
                        id={this.props.id}
                        value={this.props.code}
                        checked={checked}
                        onChange={this.toggleFilter} />
                    <label htmlFor={this.props.id}>{this.props.name}</label>
                </div>
            </div>
        );
    }
}

SingleCheckboxType.propTypes = propTypes;
SingleCheckboxType.defaultProps = defaultProps;
