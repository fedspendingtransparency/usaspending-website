/**
 * TimePeriod.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import moment from 'moment';
import { Set } from 'immutable';
import DateRange from './DateRange';
import AllFiscalYears from './AllFiscalYears';
import DateRangeError from './DateRangeError';

const defaultProps = {
    activeTab: 'fy'
};

const propTypes = {
    label: React.PropTypes.string,
    timePeriods: React.PropTypes.array,
    activeTab: React.PropTypes.string,
    updateFilter: React.PropTypes.func,
    changeTab: React.PropTypes.func
};

export default class TimePeriod extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            showError: false,
            header: '',
            description: '',
            isActive: false,
            selectedFY: new Set(),
            allFY: false
        };
    }

    toggleFilters(filter) {
        this.props.changeTab(filter);
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
                this.showError('Invalid Dates',
                'The end date cannot be earlier than the start date.');
            }
            else {
                // valid!
                this.hideError();
                // update the filter parameters
                this.props.updateFilter({
                    startDate: start.format('YYYY-MM-DD'),
                    endDate: end.format('YYYY-MM-DD')
                });
            }
        }
        else {
            // not all dates exist yet
            this.hideError();
        }
    }

    showError(error, message) {
        this.setState({
            showError: true,
            header: error,
            errorMessage: message
        });
    }
    hideError() {
        this.setState({
            showError: false,
            header: '',
            errorMessage: ''
        });
    }

    saveSelected(arrayFY, allSelected) {
        this.setState({
            selectedFY: arrayFY,
            allFY: allSelected
        }, () => {
            this.props.updateFilter({
                fy: [...this.state.selectedFY]
            });
        });
    }

    render() {
        let errorDetails = null;
        let showFilter = null;
        let activeClassFY = null;
        let activeClassDR = null;

        if (this.state.showError && this.props.activeTab === 'dr') {
            errorDetails = (<DateRangeError
                header={this.state.header} message={this.state.errorMessage} />);
        }

        if (this.props.activeTab === 'fy') {
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
                onDateChange={this.handleDateChange.bind(this)}
                showError={this.showError.bind(this)}
                hideError={this.hideError.bind(this)} />);
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
                { errorDetails }
            </div>
        );
    }
}

TimePeriod.propTypes = propTypes;
TimePeriod.defaultProps = defaultProps;
