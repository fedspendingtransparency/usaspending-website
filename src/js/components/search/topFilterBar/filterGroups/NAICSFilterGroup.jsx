/**
 * NAICSFilterGroup.jsx
 * Created by Emily Gullo 07/21/2017
 */

import React from 'react';
import PropTypes from 'prop-types';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object
};

export default class NAICSFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
        // remove a single filter item
        const newValue = this.props.redux.reduxFilters.selectedNAICS.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'selectedNAICS',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('selectedNAICS');
    }

    generateTags() {
        const tags = [];

        // check to see if an naics code is provided
        const naics = this.props.filter.values;

        naics.forEach((value) => {
            const tag = {
                value: `${value.identifier}`,
                title: `${value.naics} | ${value.naics_description}`,
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
            clearFilterGroup={this.clearGroup} />);
    }
}

NAICSFilterGroup.propTypes = propTypes;
