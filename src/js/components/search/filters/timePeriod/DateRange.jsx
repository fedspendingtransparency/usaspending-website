/**
 * DateRange.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from 'components/sharedComponents/DatePicker';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import IndividualSubmit from 'components/search/filters/IndividualSubmit';

const defaultProps = {
    startDate: '01/01/2016',
    endDate: '12/31/2016',
    startingTab: 1
};

const propTypes = {
    startingTab: PropTypes.number,
    onDateChange: PropTypes.func,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    selectedStart: PropTypes.string,
    selectedEnd: PropTypes.string,
    showError: PropTypes.func,
    hideError: PropTypes.func,
    applyDateRange: PropTypes.func,
    removeDateRange: PropTypes.func
};

export default class DateRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            header: '',
            errorMessage: ''
        };

        this.submitRange = this.submitRange.bind(this);
        this.removeRange = this.removeRange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.startDate !== this.props.startDate && !this.props.startDate) {
            // the start date was reset to null, clear the picker
            this.startPicker.clearValue();
        }
        if (prevProps.endDate !== this.props.endDate && !this.props.endDate) {
            // the end date was reset to null, clear the picker
            this.endPicker.clearValue();
        }
    }

    submitRange(e) {
    // allow the user to change date ranges by keyboard and pressing enter
        e.preventDefault();
        this.props.applyDateRange();
    }

    removeRange() {
        const tabButton = document.getElementById('filter-date-range-tab');
        if (tabButton) {
            tabButton.focus();
        }
        this.props.removeDateRange();
    }

    generateStartDateDisabledDays(earliestDate) {
    // handle the cutoff dates (preventing end dates from coming before
    // start dates or vice versa)
        const disabledDays = [earliestDate];

        if (this.props.endDate) {
            // the cutoff date represents the latest possible date
            disabledDays.push({
                after: this.props.endDate.toDate()
            });
        }

        return disabledDays;
    }

    generateEndDateDisabledDays(earliestDate) {
        const disabledDays = [earliestDate];

        if (this.props.startDate) {
            // cutoff date represents the earliest possible date
            disabledDays.push({
                before: this.props.startDate.toDate()
            });
        }

        return disabledDays;
    }

    render() {
        const earliestDateString =
            FiscalYearHelper.convertFYToDateRange(FiscalYearHelper.earliestFiscalYear)[0];
        const earliestDate = moment(earliestDateString, 'YYYY-MM-DD').toDate();

        const startDateDisabledDays = this.generateStartDateDisabledDays(earliestDate);
        const endDateDisabledDays = this.generateEndDateDisabledDays(earliestDate);

        let dateLabel = '';
        let hideTags = 'hide';
        if (this.props.selectedStart || this.props.selectedEnd) {
            hideTags = '';
            let start = null;
            let end = null;
            if (this.props.selectedStart) {
                start = moment(this.props.selectedStart, 'YYYY-MM-DD').format('MM/DD/YYYY');
            }
            if (this.props.selectedEnd) {
                end = moment(this.props.selectedEnd, 'YYYY-MM-DD').format('MM/DD/YYYY');
            }
            if (start && end) {
                dateLabel = `${start} to ${end}`;
            }
            else if (start) {
                dateLabel = `${start} to present`;
            }
            else {
                dateLabel = `... to ${end}`;
            }
        }

        let noDates = false;
        if (!this.props.startDate && !this.props.endDate) {
            noDates = true;
        }

        const accessibility = {
            'aria-controls': 'selected-date-range'
        };

        return (
            <div className="date-range-option">
                <form
                    className="date-range-wrapper"
                    onSubmit={this.submitRange}>
                    <DatePicker
                        type="startDate"
                        title="Action Date Start"
                        onDateChange={this.props.onDateChange}
                        value={this.props.startDate}
                        opposite={this.props.endDate}
                        showError={this.props.showError}
                        hideError={this.props.hideError}
                        disabledDays={startDateDisabledDays}
                        ref={(component) => {
                            this.startPicker = component;
                        }}
                        allowClearing />
                    <DatePicker
                        type="endDate"
                        title="Action Date End"
                        onDateChange={this.props.onDateChange}
                        value={this.props.endDate}
                        opposite={this.props.startDate}
                        showError={this.props.showError}
                        hideError={this.props.hideError}
                        disabledDays={endDateDisabledDays}
                        ref={(component) => {
                            this.endPicker = component;
                        }}
                        allowClearing />
                    <IndividualSubmit
                        className="set-date-submit"
                        onClick={this.submitRange}
                        label="Filter by date range"
                        disabled={noDates}
                        accessibility={accessibility} />
                </form>
                <div
                    className={`selected-filters ${hideTags}`}
                    id="selected-date-range"
                    aria-hidden={noDates}
                    role="status">
                    <button
                        className="shown-filter-button"
                        title="Click to remove filter."
                        aria-label={`Applied date range: ${dateLabel}`}
                        onClick={this.removeRange}>
                        {dateLabel}
                        <span className="close">
                            <FontAwesomeIcon icon="times" />
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}
DateRange.defaultProps = defaultProps;
DateRange.propTypes = propTypes;
