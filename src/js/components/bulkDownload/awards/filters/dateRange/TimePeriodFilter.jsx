/**
 * TimePeriodFilter.jsx
 * Created by Lizzie Salita 11/1/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';

import DateRangeError from 'components/search/filters/timePeriod/DateRangeError';
import DownloadDateRange from './DownloadDateRange';
import TimePeriodButtons from './TimePeriodButtons';

const propTypes = {
    filterTimePeriodStart: PropTypes.string,
    filterTimePeriodEnd: PropTypes.string,
    updateStartDate: PropTypes.func,
    updateEndDate: PropTypes.func,
    valid: PropTypes.bool,
    setValidDates: PropTypes.func
};

const errorTypes = {
    order: {
        title: 'Invalid Dates',
        message: 'The end date cannot be earlier than the start date.'
    },
    range: {
        title: 'Invalid Date Range',
        message: 'Choose one of the ranges below or set your own range of one year or less.'
    }
};

export default class TimePeriodFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDateBulkUI: null,
            endDateBulkUI: null,
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
                startDateBulkUI: startDate,
                endDateBulkUI: endDate
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
                newState.startDateBulkUI = startDate;
            }
            else {
                // value became null
                datesChanged = true;
                newState.startDateBulkUI = null;
            }
        }

        // check if the end date changed
        if (nextProps.filterTimePeriodEnd !== this.props.filterTimePeriodEnd) {
            const endDate = moment(nextProps.filterTimePeriodEnd, 'YYYY-MM-DD');
            if (endDate.isValid()) {
                // end date did change and it is a valid date (not null)
                datesChanged = true;
                newState.endDateBulkUI = endDate;
            }
            else if (this.props.filterTimePeriodEnd) {
                // value became null
                datesChanged = true;
                newState.endDateBulkUI = null;
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
        // don't come before the start dates, and that the range is less than one year

        // validate the date ranges
        const start = this.state.startDateBulkUI;
        const end = this.state.endDateBulkUI;

        const yearBeforeEnd = moment(this.state.endDateBulkUI).subtract(1, 'y');

        if (start && end) {
            // both sets of dates exist
            if (!end.isSameOrAfter(start)) {
                // end date comes before start date, invalid
                // show an error message
                const error = errorTypes.order;
                this.showError(error.title, error.message);
            }
            else if (!start.isSameOrAfter(yearBeforeEnd)) {
                // Start date is more than one year before the end date
                // show an error message
                const error = errorTypes.range;
                this.showError(error.title, error.message);
            }
            else {
                // valid!
                this.hideError();
                // update the filter parameters
                this.props.updateStartDate(start.format('YYYY-MM-DD'));
                this.props.updateEndDate(end.format('YYYY-MM-DD'));
                this.props.setValidDates(true);
            }
        }
        else if (start || end) {
            // open-ended date range
            let startValue = null;
            let endValue = null;
            if (start) {
                startValue = start.format('YYYY-MM-DD');
                this.props.updateStartDate(startValue);
                this.props.setValidDates(true);
            }
            else {
                endValue = end.format('YYYY-MM-DD');
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
                header={this.state.header}
                message={this.state.errorMessage} />);
        }

        let icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );
        if (!this.props.valid || this.state.showError) {
            icon = (
                <div className="icon invalid">
                    <ExclamationCircle />
                </div>
            );
        }

        let start = '';
        if (this.state.startDateBulkUI !== null) {
            start = this.state.startDateBulkUI.format('YYYY-MM-DD');
        }
        let end = '';
        if (this.state.endDateBulkUI !== null) {
            end = this.state.endDateBulkUI.format('YYYY-MM-DD');
        }

        return (
            <div className="download-filter">
                <div className="download-filter__title">
                    {icon} Select a <span className="download-filter__title_em">date range</span>.
                </div>
                <div className="download-filter__content date-range-wrapper">
                    <DownloadDateRange
                        datePlaceholder=""
                        startDate={this.state.startDateBulkUI}
                        endDate={this.state.endDateBulkUI}
                        onDateChange={this.handleDateChange}
                        showError={this.showError}
                        hideError={this.hideError} />
                    { errorDetails }
                    <p className="data-note">
                        Note: data is available for download from 2001 - present
                    </p>
                    <TimePeriodButtons
                        currentStartDate={start}
                        currentEndDate={end}
                        handleDateChange={this.handleDateChange} />
                </div>
            </div>
        );
    }
}

TimePeriodFilter.propTypes = propTypes;
