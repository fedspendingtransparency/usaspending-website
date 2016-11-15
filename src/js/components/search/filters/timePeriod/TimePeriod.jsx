/**
 * TimePeriod.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import moment from 'moment';
import { Set } from 'immutable';
import DateRange from './DateRange';
import AllFiscalYears from './AllFiscalYears';

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
    label: React.PropTypes.string,
    timePeriods: React.PropTypes.array
};

export default class TimePeriod extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            showError: false,
            shownFilter: 'fy',
            header: '',
            description: '',
            isActive: false,
            selectedFY: new Set(),
            allFY: false
        };
    }

    toggleFilters(filter) {
        this.setState({
            shownFilter: filter
        });
    }

    handleDateChange(date, dateType) {
    // merge the new date into the file's state without affecting the other keys
        this.setState({
            [dateType]: moment(date)
        }, () => {
            this.validateDates();
        });
    }

    validateDates() {
        // validate that dates are provided for both fields and the end dates
        // don't come before the start dates

        // validate the date ranges
        const start = this.state.startDate;
        const end = this.state.endDate;
        if (start && end) {
            // both sets of dates exist
            if (!end.isSameOrAfter(start)) {
                // end date comes before start date, invalid
                // show an error message
                this.setState({
                    showError: true,
                    header: 'Invalid Dates',
                    errorMessage: 'The end date cannot be earlier than the start date.'
                });
            }
            else {
                // valid!
                this.setState({
                    showError: false,
                    header: '',
                    errorMessage: ''
                });
            }
        }
        else {
            // not all dates exist yet
            this.setState({
                showError: false,
                header: '',
                errorMessage: ''
            });
        }
    }

    saveSelected(arrayFY, allSelected) {
        this.setState({
            selectedFY: arrayFY,
            allFY: allSelected
        });
    }

    render() {
        let showFilter = null;
        let activeClassFY = null;
        let activeClassDR = null;

        if (this.state.shownFilter === 'fy') {
            showFilter = (<AllFiscalYears
                saveSelected={this.saveSelected.bind(this)}
                timePeriods={this.props.timePeriods}
                allFY={this.state.allFY}
                selectedFY={this.state.selectedFY} />);
            activeClassFY = '';
            activeClassDR = 'inactive';
        }
        else {
            showFilter = (<DateRange
                label={this.props.label}
                datePlaceholder=""
                startingTab={1}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onDateChange={this.handleDateChange.bind(this)} />);
            activeClassFY = 'inactive';
            activeClassDR = '';
        }

        return (
            <div className="time-period-filter">
                <b>Time Period</b>
                <div className="toggle-buttons">
                    <button
                        className={`toggle ${activeClassFY}`}
                        onClick={() => {
                            this.toggleFilters('fy');
                        }}>Fiscal Year</button>
                    <button
                        className={`toggle ${activeClassDR}`}
                        onClick={() => {
                            this.toggleFilters('dr');
                        }}>Date Range</button>
                </div>
                { showFilter }
            </div>
        );
    }
}

TimePeriod.propTypes = propTypes;
TimePeriod.defaultProps = defaultProps;
