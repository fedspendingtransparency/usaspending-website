/**
 * SecondaryAwardType.jsx
 * Created by Emily Gullo 11/02/2016
 **/

import React from 'react';

const propTypes = {
    id: React.PropTypes.string,
    code: React.PropTypes.string,
    name: React.PropTypes.string,
    toggleAwardType: React.PropTypes.func,
    reduxFilters: React.PropTypes.object
};

const ga = require('react-ga');

export default class SecondaryAwardType extends React.Component {
    static logSecondaryTypeFilterEvent(type) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: 'Selected Secondary Award Type',
            label: type
        });
    }

    static logDeselectFilterEvent(type) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: 'Deselected Secondary Award Type',
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
        this.props.toggleAwardType(this.props.code);
        // Analytics
        const checked = this.props.reduxFilters.includes(this.props.code);
        if (checked) {
            SecondaryAwardType.logDeselectFilterEvent(this.props.name);
        }
        else {
            SecondaryAwardType.logSecondaryTypeFilterEvent(this.props.name);
        }
    }
    render() {
        const checked = this.props.reduxFilters.includes(this.props.code);
        return (
            <li key={this.props.id} className="secondary-award-type sub-list">
                <div className="award-type-item-wrapper">
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
SecondaryAwardType.propTypes = propTypes;
