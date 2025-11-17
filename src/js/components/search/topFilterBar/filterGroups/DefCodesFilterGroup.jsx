/**
 * DefCodesFilterGroup.jsx
 * Created by Maxwell Kendall 06/01/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

import BaseTopFilterGroup from './BaseTopFilterGroup';
import { defCodes, defCodeGroups } from '../../../../dataMapping/search/defCodes';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};
const groupLabels = {
    covid_19: 'COVID-19 Spending',
    infrastructure: 'Infrastructure Spending'
};
export default class DefCodesFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        const newValue = this.props.redux.reduxFilters.defCodes.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'defCodes',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('defCodes');
    }

    generateTags() {
        const tags = [];

        // check to see if any type groups are fully selected
        const selectedValues = this.props.filter.values;
        const fullGroups = [];
        let excludedValues = [];

        const covidGroup = defCodeGroups.covid;
        const infrastructureGroup = defCodeGroups.infrastructure;

        if (selectedValues?.length) {
            if (covidGroup.every((value) => selectedValues.includes(value))) {
                // covid group is full
                fullGroups.push("covid_19");
                // exclude these values from the remaining tags
                excludedValues = [...excludedValues, ...covidGroup];
            }

            if (infrastructureGroup.every((value) => selectedValues.includes(value))) {
                // covid group is full
                fullGroups.push("infrastructure");
                excludedValues = [...excludedValues, ...infrastructureGroup];
            }
        }

        // add full groups to the beginning of the tag list
        if (fullGroups.length) {
            fullGroups.forEach((group) => {
                const tag = {
                    value: group,
                    title: `All ${groupLabels[group]}`,
                    removeFilter: this.removeGroup
                };

                tags.push(tag);
            });
        }

        selectedValues.forEach((value) => {
            if (!excludedValues.includes(value)) {
                const tag = {
                    value,
                    title: defCodes[value].title,
                    removeFilter: this.removeFilter
                };
                tags.push(tag);
            }
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

DefCodesFilterGroup.propTypes = propTypes;
