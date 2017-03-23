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
    filterTimePeriodFY: React.PropTypes.instanceOf(Set),
    filterTimePeriodStart: React.PropTypes.string,
    filterTimePeriodEnd: React.PropTypes.string,
    filterTimePeriodType: React.PropTypes.string,
    label: React.PropTypes.string,
    timePeriods: React.PropTypes.array,
    activeTab: React.PropTypes.string,
    updateFilter: React.PropTypes.func,
    changeTab: React.PropTypes.func
};

const ga = require('react-ga');

export default class TimePeriod extends React.Component {
    static logDateRangeEvent(start, end) {
        ga.event({
            category: 'Search Page Filters',
            action: 'Applied Date Range Filter',
            label: `${start} - ${end}`
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            startDateUI: null,
            endDateUI: null,
            showError: false,
            header: '',
            description: '',
            isActive: false,
            selectedFY: new Set(),
            allFY: false
        };

        // bind functions
        this.handleDateChange = this.handleDateChange.bind(this);
        this.saveSelected = this.saveSelected.bind(this);
        this.showError = this.showError.bind(this);
        this.hideError = this.hideError.bind(this);
        this.toggleFilters = this.toggleFilters.bind(this);
    }

    componentDidMount() {
        this.prepopulateDatePickers();
    }

    componentWillReceiveProps(nextProps) {
        this.synchronizeDatePickers(nextProps);
    }

    prepopulateDatePickers() {
        if ((!this.props.filterTimePeriodStart || !this.props.filterTimePeriodEnd) &&
            this.props.filterTimePeriodType !== 'dr') {
            // not filtering by a date range
            return;
        }

        // prepopulate the date pickers with the current filter values (in the event of remounting
        // or loading from a URL)
        const startDate = moment(this.props.filterTimePeriodStart, 'YYYY-MM-DD');
        const endDate = moment(this.props.filterTimePeriodEnd, 'YYYY-MM-DD');

        if (startDate.isValid() && endDate.isValid()) {
            this.setState({
                startDateUI: startDate,
                endDateUI: endDate
            });
        }
    }

    synchronizeDatePickers(nextProps) {
        // synchronize the date picker state to Redux controlled props
         // convert start/end date strings to moment objects
        let datesChanged = false;
        const newState = {};

        // check if the start date changed
        if (nextProps.filterTimePeriodStart !== this.props.filterTimePeriodStart) {
            const startDate = moment(nextProps.filterTimePeriodStart, 'YYYY-MM-DD');
            // start date did change and it is a valid date (not null)
            if (startDate.isValid()) {
                datesChanged = true;
                newState.startDateUI = startDate;
            }
            else {
                // value became null
                datesChanged = true;
                newState.startDateUI = null;
            }
        }

        // check if the end date changed
        if (nextProps.filterTimePeriodEnd !== this.props.filterTimePeriodEnd) {
            const endDate = moment(nextProps.filterTimePeriodEnd, 'YYYY-MM-DD');
            if (endDate.isValid()) {
                // end date did change and it is a valid date (not null)
                datesChanged = true;
                newState.endDateUI = endDate;
            }
            else if (this.props.filterTimePeriodEnd) {
                // value became null
                datesChanged = true;
                newState.endDateUI = null;
            }
        }
        if (datesChanged) {
            this.setState(newState);
        }
    }

    toggleFilters(e) {
        this.props.changeTab(e.target.value);
    }

    handleDateChange(date, dateType) {
        // the component will hold values of the start/end dates for use by the UI only
        // this is because the start/end range will be incomplete during the time the user has only
        // picked one date, or if they have picked an invalid range
        // additional logic is required to keep these values in sync with Redux
        this.setState({
            [`${dateType}UI`]: moment(date)
        }, () => {
            this.validateDates();
        });
    }

    validateDates() {
        // validate that dates are provided for both fields and the end dates
        // don't come before the start dates

        // validate the date ranges
        const start = this.state.startDateUI;
        const end = this.state.endDateUI;
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
                    dateType: 'dr',
                    startDate: start.format('YYYY-MM-DD'),
                    endDate: end.format('YYYY-MM-DD')
                });
                // Analytics
                const startDate = start.format('YYYY-MM-DD');
                const endDate = end.format('YYYY-MM-DD');
                TimePeriod.logDateRangeEvent(startDate, endDate);
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
                updateFilter={this.props.updateFilter}
                timePeriods={this.props.timePeriods}
                selectedFY={this.props.filterTimePeriodFY} />);
            activeClassFY = '';
            activeClassDR = 'inactive';
        }
        else {
            showFilter = (<DateRange
                label={this.props.label}
                datePlaceholder=""
                startingTab={1}
                startDate={this.state.startDateUI}
                endDate={this.state.endDateUI}
                onDateChange={this.handleDateChange}
                showError={this.showError}
                hideError={this.hideError} />);
            activeClassFY = 'inactive';
            activeClassDR = '';
        }

        return (
            <div className="time-period-filter search-filter">
                <ul className="toggle-buttons">
                    <li>
                        <button
                            className={`date-toggle ${activeClassFY}`}
                            value="fy"
                            onClick={this.toggleFilters}>Fiscal Year</button>
                    </li>
                    <li>
                        <button
                            className={`date-toggle ${activeClassDR}`}
                            value="dr"
                            onClick={this.toggleFilters}>Date Range</button>
                    </li>
                </ul>
                { showFilter }
                { errorDetails }
            </div>
        );
    }
}

TimePeriod.propTypes = propTypes;
TimePeriod.defaultProps = defaultProps;
