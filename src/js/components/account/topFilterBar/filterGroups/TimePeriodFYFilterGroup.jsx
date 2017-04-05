/**
 * TimePeriodFYGroup.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import BaseTopFilterGroup from 'components/search/topFilterBar/filterGroups/BaseTopFilterGroup';

const propTypes = {
    filter: React.PropTypes.object,
    redux: React.PropTypes.object
};

export default class TimePeriodFYFilterGroup extends React.Component {
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

        // determine how many fiscal years there are available to select
        // add an extra year at the end to include the current year in the count
        const allFY = (FiscalYearHelper.currentFiscalYear() - FiscalYearHelper.earliestFiscalYear)
            + 1;

        // check if all fiscal years were selected
        if (selectedValues.length === allFY) {
            const tag = {
                value: 'all',
                title: 'All Fiscal Years',
                isSpecial: true,
                removeFilter: this.clearGroup
            };

            tags.push(tag);
        }
        else {
            // not all fiscal years were selected, list them individually
            selectedValues.forEach((value) => {
                const tag = {
                    value,
                    title: `FY ${value}`,
                    isSpecial: false,
                    removeFilter: this.removeFilter
                };

                tags.push(tag);
            });
        }

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

TimePeriodFYFilterGroup.propTypes = propTypes;
