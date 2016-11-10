/**
 * AllFiscalYears.jsx
 * Created by Emily Gullo 11/08/2016
 **/

import React from 'react';
import { Set } from 'immutable';

import FiscalYear from './FiscalYear';

const defaultProps = {
    timePeriods: [
        '2016',
        '2015',
        '2014',
        '2013',
        '2012',
        '2011',
        '2010',
        '2009'
    ]
};

const propTypes = {
    timePeriods: React.PropTypes.array
};

export default class AllFiscalYears extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFY: new Set(),
            allFY: false
        };
    }


    saveSelectedYear(year) {
        // copy array
        let arrayFY = new Set(this.state.selectedFY);
        let allSelected = false;

        // if already in array, it's being unselected and needs to be removed
        if (arrayFY.includes(year)) {
            arrayFY = arrayFY.delete(year);
        }
        // otherwise add it to the array
        else {
            arrayFY = arrayFY.add(year);
        }

        // if all available years have been chosen, make sure all years box is checked
        if (arrayFY.size === this.props.timePeriods.length) {
            allSelected = true;
        }
        else {
            allSelected = false;
        }

        this.setState({
            selectedFY: arrayFY,
            allFY: allSelected
        });
    }

    saveAllYears() {
        let arrayFY = new Set(this.state.selectedFY);
        const allFY = this.state.allFY;
        const allYears = new Set(this.props.timePeriods);
        // if the there are years in the array, clear them out, we're unticking
        if (!arrayFY.isEmpty()) {
            arrayFY = arrayFY.clear();
        }
        // otherwise add all available years to the array
        else {
            arrayFY = arrayFY.merge(allYears);
        }
        // set state
        this.setState({
            selectedFY: arrayFY,
            allFY: !allFY
        });
    }

    render() {
        const parentFY = (<FiscalYear
            checked={this.state.allFY}
            year="all"
            key="all"
            saveAllYears={this.saveAllYears.bind(this)} />);

        const fiscalYears = this.props.timePeriods.map((year, index) =>
            <FiscalYear
                checked={this.state.selectedFY.has(year)}
                year={year}
                key={index}
                saveSelectedYear={this.saveSelectedYear.bind(this)} />);

        return (
            <ul className="fiscalYears">
                { parentFY }
                {fiscalYears}
            </ul>
        );
    }
}
AllFiscalYears.defaultProps = defaultProps;
AllFiscalYears.propTypes = propTypes;
