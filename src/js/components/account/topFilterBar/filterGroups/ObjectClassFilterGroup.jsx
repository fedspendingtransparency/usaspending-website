/**
 * ObjectClassFilterGroup.jsx
 * Created by Kevin Li 3/31/17
 */

import React from 'react';

import { objectClassDefinitions } from 'dataMapping/search/budgetCategory';

import BaseTopFilterGroup from 'components/search/topFilterBar/filterGroups/BaseTopFilterGroup';

const propTypes = {
    filter: React.PropTypes.object,
    redux: React.PropTypes.object
};

export default class ObjectClassFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
        // remove a single filter item
        const timePeriodFilter = {
            dateType: this.props.redux.reduxFilters.dateType,
            fy: this.props.redux.reduxFilters.fy,
            start: this.props.redux.reduxFilters.startDate,
            end: this.props.redux.reduxFilters.endDate
        };

        // remove the item from the set
        timePeriodFilter.dateType = 'fy';
        // as an ImmutableJS structure, the delete function will return a new instance
        timePeriodFilter.fy = this.props.redux.reduxFilters.fy.delete(value);

        // reuse the Redux action from the time period filter component
        this.props.redux.updateTimePeriod(timePeriodFilter);
    }

    clearGroup() {
        this.props.redux.resetTimeFilters();
    }

    generateTags() {
        const tags = [];

        const selectedValues = this.props.filter.values;

        selectedValues.forEach((value) => {
            const label = objectClassDefinitions[value];
            const tag = {
                value,
                title: label,
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

ObjectClassFilterGroup.propTypes = propTypes;
