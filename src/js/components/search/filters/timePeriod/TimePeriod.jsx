/**
 * TimePeriod.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Set } from 'immutable';

import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

import DateRange from './DateRange';
import AllFiscalYears from './AllFiscalYears';
import DateRangeError from './DateRangeError';

const defaultProps = {
    activeTab: 'fy',
    disableDateRange: false
};

const propTypes = {
    filterTimePeriodFY: PropTypes.instanceOf(Set),
    filterTimePeriodStart: PropTypes.string,
    filterTimePeriodEnd: PropTypes.string,
    filterTimePeriodType: PropTypes.string,
    label: PropTypes.string,
    timePeriods: PropTypes.array,
    activeTab: PropTypes.string,
    updateFilter: PropTypes.func,
    changeTab: PropTypes.func,
    disableDateRange: PropTypes.bool,
    dirtyFilters: PropTypes.symbol
};

export default class TimePeriod extends React.Component {
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
        this.validateDates = this.validateDates.bind(this);
        this.removeDateRange = this.removeDateRange.bind(this);
    }

    componentDidMount() {
        this.prepopulateDatePickers();
    }

    componentDidUpdate(prevProps) {
        this.synchronizeDatePickers(this.props);

        if (prevProps.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
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
        let value = moment(date);
        if (!date) {
            value = null;
        }
        this.setState({
            [`${dateType}UI`]: value
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
            }
        }
        else if (start || end) {
            // open-ended date range
            let startValue = null;
            let endValue = null;
            if (start) {
                startValue = start.format('YYYY-MM-DD');
            }
            else {
                endValue = end.format('YYYY-MM-DD');
            }

            this.props.updateFilter({
                dateType: 'dr',
                startDate: startValue,
                endDate: endValue
            });
        }
        else {
            // user has cleared the dates, which means we should clear the date range filter
            this.props.updateFilter({
                dateType: 'dr',
                startDate: null,
                endDate: null
            });
        }
    }

    removeDateRange() {
        this.props.updateFilter({
            dateType: 'dr',
            startDate: null,
            endDate: null
        });
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
                header={this.state.header}
                message={this.state.errorMessage} />);
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
                selectedStart={this.props.filterTimePeriodStart}
                selectedEnd={this.props.filterTimePeriodEnd}
                onDateChange={this.handleDateChange}
                showError={this.showError}
                hideError={this.hideError}
                applyDateRange={this.validateDates}
                removeDateRange={this.removeDateRange} />);
            activeClassFY = 'inactive';
            activeClassDR = '';
        }

        if (this.props.disableDateRange) {
            activeClassDR = 'hidden';
        }

        return (
            <div className="tab-filter-wrap">
                <div className="filter-item-wrap">
                    <ul
                        className="toggle-buttons"
                        role="menu">
                        <li>
                            <button
                                className={`date-toggle ${activeClassFY}`}
                                value="fy"
                                role="menuitemradio"
                                aria-checked={this.props.activeTab === 'fy'}
                                aria-label="Fiscal Year"
                                title="Fiscal Year"
                                onClick={this.toggleFilters}>
                                Fiscal Year
                            </button>
                        </li>
                        <li>
                            <button
                                className={`date-toggle ${activeClassDR}`}
                                id="filter-date-range-tab"
                                value="dr"
                                role="menuitemradio"
                                aria-checked={this.props.activeTab === 'dr'}
                                aria-label="Date Range"
                                title="Date Range"
                                onClick={this.toggleFilters}
                                disabled={this.props.disableDateRange}>
                                Date Range
                            </button>
                        </li>
                    </ul>
                    { showFilter }
                    { errorDetails }
                    <SubmitHint
                        ref={(component) => {
                            this.hint = component;
                        }} />
                </div>
            </div>
        );
    }
}

TimePeriod.propTypes = propTypes;
TimePeriod.defaultProps = defaultProps;
