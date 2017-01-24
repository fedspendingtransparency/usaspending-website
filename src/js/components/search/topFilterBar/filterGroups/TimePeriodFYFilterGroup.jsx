/**
 * TimePeriodFYGroup.jsx
 * Created by Kevin Li 1/24/17
 */

import React from 'react';
import _ from 'lodash';

import { Set } from 'immutable';

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: React.PropTypes.object,
    removeFilter: React.PropTypes.func,
    clearFilterGroup: React.PropTypes.func
};

export default class TimePeriodFYFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.removeAll = this.removeAll.bind(this);
    }

    removeFilter(value) {
        // remove a single filter item
        this.props.removeFilter(this.props.filter.code, value);
    }

    removeAll() {
        // remove all fiscal years
        // this is the same as just clearing the filter group
        this.props.clearFilterGroup('timePeriodFY');
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
                removeFilter: this.removeAll
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

        return <BaseTopFilterGroup {...this.props} tags={tags} />;
    }
}

TimePeriodFYFilterGroup.propTypes = propTypes;
