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

export default class AllFiscalYears extends React.Component {
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
        }

        this.props.updateFilter({
            fy: newYears
        });
    }

    render() {
        let allFY = true;

        const leftCount = Math.ceil(this.props.timePeriods.length / 2);

        const leftFY = [];
        const rightFY = [];

        this.props.timePeriods.forEach((year, i) => {
            // determine if the checkbox should be selected based on whether the filter is already
            // applied
            const checked = this.props.selectedFY.has(year);

            if (!checked) {
                allFY = false;
            }

            const fy = (<FiscalYear
                checked={checked}
                year={year}
                key={`filter-fy-${year}`}
                saveSelectedYear={this.saveSelectedYear} />);

            if (i + 1 <= leftCount) {
                leftFY.push(fy);
            }
            else {
                rightFY.push(fy);
            }
        });

        return (
            <ul className="fiscal-years">
                <FiscalYear
                    checked={allFY}
                    year="all"
                    key="filter-fy-all"
                    saveAllYears={this.saveAllYears} />
                <div className="fy-columns-container">
                    <div className="left-fy">
                        {leftFY}
                    </div>
                    <div className="right-fy">
                        {rightFY}
                    </div>
                </div>
            </ul>
        );
    }
}

AllFiscalYears.propTypes = propTypes;
