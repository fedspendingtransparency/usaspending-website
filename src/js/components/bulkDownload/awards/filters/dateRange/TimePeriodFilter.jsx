/**
 * TimePeriodFilter.jsx
 * Created by Lizzie Salita 11/1/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CheckCircle, ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

import DateRangeError from 'components/search/filters/timePeriod/DateRangeError';
import DownloadDateRange from './DownloadDateRange';

const propTypes = {
    filterTimePeriodStart: PropTypes.string,
    filterTimePeriodEnd: PropTypes.string,
    updateStartDate: PropTypes.func,
    updateEndDate: PropTypes.func,
    valid: PropTypes.bool,
    setValidDates: PropTypes.func
};

export default class TimePeriodFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDateUI: null,
            endDateUI: null,
            showError: false,
            header: '',
            description: '',
            isActive: false
        };

        // bind functions
        this.handleDateChange = this.handleDateChange.bind(this);
        this.showError = this.showError.bind(this);
        this.hideError = this.hideError.bind(this);
        this.validateDates = this.validateDates.bind(this);
    }

    componentDidMount() {
        this.prepopulateDatePickers();
    }

    componentWillReceiveProps(nextProps) {
        this.synchronizeDatePickers(nextProps);
    }

    prepopulateDatePickers() {
        // prepopulate the date pickers with the current filter values
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

    handleDateChange(date, dateType) {
        // the component will hold values of the start/end dates for use by the UI only
        // this is because the start/end range will be incomplete during the time the user has only
        // picked one date, or if they have picked an invalid range
        // additional logic is required to keep these values in sync with Redux
        let value = moment(date);
        if (!date) {
            value = null;
        }
        this.setState({
            [`${dateType}UI`]: value
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
                this.props.updateStartDate(start.format('MM-DD-YYYY'));
                this.props.updateEndDate(end.format('MM-DD-YYYY'));
                this.props.setValidDates(true);
            }
        }
        else if (start || end) {
            // open-ended date range
            let startValue = null;
            let endValue = null;
            if (start) {
                startValue = start.format('MM-DD-YYYY');
                this.props.updateStartDate(startValue);
                this.props.setValidDates(true);
            }
            else {
                endValue = end.format('MM-DD-YYYY');
                this.props.updateEndDate(endValue);
                this.props.setValidDates(true);
            }
        }
        else {
            // user has cleared the dates, which means we should clear the date range filter
            this.props.updateStartDate('');
            this.props.updateEndDate('');
            this.props.setValidDates(false);
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

    render() {
        let errorDetails = null;

        if (this.state.showError) {
            errorDetails = (<DateRangeError
                header={this.state.header} message={this.state.errorMessage} />);
        }

        let icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );
        if (!this.props.valid || this.state.showError) {
            icon = (
                <div className="icon invalid">
                    <ExclamationTriangle />
                </div>
            );
        }

        const showFilter = (
            <DownloadDateRange
                datePlaceholder=""
                startDate={this.state.startDateUI}
                endDate={this.state.endDateUI}
                onDateChange={this.handleDateChange}
                showError={this.showError}
                hideError={this.hideError} />);
        return (
            <div className="filter-section">
                <h5 className="filter-section-title">
                    {icon} Select a <span>date range</span>.
                </h5>
                <div className="filter-section-content date-range-wrapper">
                    { showFilter }
                    { errorDetails }
                </div>
            </div>
        );
    }
}

TimePeriodFilter.propTypes = propTypes;
