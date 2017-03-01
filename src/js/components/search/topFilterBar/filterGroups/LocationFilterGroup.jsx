/**
 * LocationFilterGroup.jsx
 * Created by Kevin Li 1/25/17
 */

import React from 'react';
import _ from 'lodash';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: React.PropTypes.object,
    removeFilter: React.PropTypes.func,
    clearFilterGroup: React.PropTypes.func,
    toggle: React.PropTypes.string
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
    }

    removeFilter(value) {
        // remove a single filter item
        this.props.removeFilter(this.props.filter.code, value);
    }

    removeScope() {
        this.props.clearFilterGroup(this.props.toggle);
    }

    generateLabel(item) {
        // capitalize just the first letter of each word in the place type
        const placeType = item.place_type.toLowerCase()
            .replace(/(^|\s|[-_])\S{1}/g, (letter) => (letter.toUpperCase()));
        let label = `${placeType} | ${item.place}`;

        if (item.parent) {
            label += `, ${item.parent}`;
        }

        return label;
    }

    generateTags() {
        const tags = [];

        // check to see if a location is provided
        let remainingValues = this.props.filter.values;
        if (this.props.filter.scope !== 'all') {
            // there is a scope and it will always be the last filter item
            remainingValues = _.dropRight(this.props.filter.values, 1);

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
                title: this.generateLabel(value),
                isSpecial: false,
                removeFilter: this.removeFilter
            };

            tags.push(tag);
        });

        return tags;
    }

    render() {
        const tags = this.generateTags();

        return <BaseTopFilterGroup {...this.props} tags={tags} />;
    }
}

LocationFilterGroup.propTypes = propTypes;
