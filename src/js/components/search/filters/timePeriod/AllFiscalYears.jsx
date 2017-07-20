/**
 * AllFiscalYears.jsx
 * Created by Emily Gullo 11/08/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Set } from 'immutable';

import FiscalYear from './FiscalYear';

const propTypes = {
    timePeriods: PropTypes.array,
    selectedFY: PropTypes.object,
    updateFilter: PropTypes.func
};

const ga = require('react-ga');

export default class AllFiscalYears extends React.Component {
    static logFYEvent(year) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: 'Applied Fiscal Year Filter',
            label: year
        });
    }

    constructor(props) {
        super(props);
        // bind functions
        this.saveAllYears = this.saveAllYears.bind(this);
        this.saveSelectedYear = this.saveSelectedYear.bind(this);
    }
    saveSelectedYear(year) {
        let newYears;

        // check if we are adding or removing
        if (this.props.selectedFY.has(year)) {
            // the year already exists in the set so we are removing
            newYears = this.props.selectedFY.delete(year);
        }
        else {
            // the year does not yet exist in the set so we are adding
            newYears = this.props.selectedFY.add(year);
            // Analytics
            AllFiscalYears.logFYEvent(year);
        }

        this.props.updateFilter({
            fy: newYears
        });
    }

    saveAllYears() {
        let newYears;

        // check if the all the years are already provided
        const allFY = this.props.timePeriods.length === this.props.selectedFY.count();
        if (allFY) {
            // all the years are already selected, so this is an operation to unselect everything
            newYears = new Set([]);
        }
        else {
            // we need to select all the years
            newYears = new Set(this.props.timePeriods);
            // Analytics
            AllFiscalYears.logFYEvent('all');
        }

        this.props.updateFilter({
            fy: newYears
        });
    }

    render() {
        let allFY = true;

        const fiscalYears = this.props.timePeriods.map((year) => {
            // determine if the checkbox should be selected based on whether the filter is already
            // applied
            const checked = this.props.selectedFY.has(year);

            if (!checked) {
                allFY = false;
            }

            return (<FiscalYear
                checked={checked}
                year={year}
                key={`filter-fy-${year}`}
                saveSelectedYear={this.saveSelectedYear} />);
        });

        return (
            <ul className="fiscal-years">
                <FiscalYear
                    checked={allFY}
                    year="all"
                    key="filter-fy-all"
                    saveAllYears={this.saveAllYears} />
                {fiscalYears}
            </ul>
        );
    }
}

AllFiscalYears.propTypes = propTypes;
