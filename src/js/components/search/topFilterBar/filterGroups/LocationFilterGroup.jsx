/**
 * LocationFilterGroup.jsx
 * Created by Kevin Li 1/25/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { dropRight } from 'lodash';

import * as LocationFormatter from 'helpers/locationFormatter';
import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    toggle: PropTypes.string,
    compressed: PropTypes.bool
};

const scopeLabels = {
    domestic: 'Only U.S. Locations',
    foreign: 'Only Foreign Locations'
};

export default class LocationFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.removeScope = this.removeScope.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
        // remove a single filter item
        // this.props.removeFilter(this.props.filter.code, value);
        // remove a single filter item
        const newValue = this.props.redux.reduxFilters[this.props.filter.code].delete(value);
        this.props.redux.updateGenericFilter({
            type: this.props.filter.code,
            value: newValue
        });
    }

    removeScope() {
        this.props.redux.clearFilterType(this.props.toggle);
    }

    clearGroup() {
        this.props.redux.clearFilterType(this.props.filter.code);
        this.props.redux.clearFilterType(this.props.toggle);
    }

    generateTags() {
        const tags = [];

        // check to see if a location is provided
        let remainingValues = this.props.filter.values;
        if (this.props.filter.scope !== 'all') {
            // there is a scope and it will always be the last filter item
            remainingValues = dropRight(this.props.filter.values, 1);

            // add a tag for the scope filter
            const tag = {
                value: this.props.filter.scope,
                title: scopeLabels[this.props.filter.scope],
                isSpecial: true,
                removeFilter: this.removeScope
            };

            tags.push(tag);
        }

        remainingValues.forEach((value) => {
            const tag = {
                value: value.identifier,
                title: LocationFormatter.formatLocation(value),
                isSpecial: false,
                removeFilter: this.removeFilter
            };

            tags.push(tag);
        });

        return tags;
    }

    render() {
        const tags = this.generateTags();

        return (<BaseTopFilterGroup
            tags={tags}
            filter={this.props.filter}
            clearFilterGroup={this.clearGroup}
            compressed={this.props.compressed} />);
    }
}

LocationFilterGroup.propTypes = propTypes;
