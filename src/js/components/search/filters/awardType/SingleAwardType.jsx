/**
 * SingleAwardType.jsx
 * Created by Kevin Li 11/7/16
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

export default class SingleAwardType extends React.Component {
    static logSingleTypeFilterEvent(type) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: 'Selected Award Type',
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
        SingleAwardType.logSingleTypeFilterEvent(this.props.name);
    }
    render() {
        const checked = this.props.reduxFilters.includes(this.props.code);
        return (
            <div className="primary-award-type single-item">
                <div className="award-type-item-wrapper">
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
SingleAwardType.propTypes = propTypes;
