/**
 * DateRange.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from 'components/sharedComponents/DatePicker';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import IndividualSubmit from 'components/search/filters/IndividualSubmit';
import { usePrevious } from "../../../../helpers/";

const dayjs = require('dayjs');

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

const DateRange = (props) => {
    console.debug("incoming props: ", props);
    const [startPicker, setStartPicker] = useState(null);
    const [endPicker, setEndPicker] = useState(null);
    const prevProps = usePrevious(props);

    useEffect(() => {
        if (prevProps?.startDate !== props?.startDate && !props?.startDate) {
            // the start date was reset to null, clear the picker
            startPicker?.clearValue();
        }
    }, [props?.startDate]);

    useEffect(() => {
        if (prevProps?.endDate !== props?.endDate && !props?.endDate) {
            // the end date was reset to null, clear the picker
            endPicker?.clearValue();
        }
    }, [props?.endDate]);

    const submitRange = (e) => {
    // allow the user to change date ranges by keyboard and pressing enter
        e.preventDefault();
        props.applyDateRange();
    };

    const removeRange = () => {
        const tabButton = document.getElementById('filter-date-range-tab');
        if (tabButton) {
            tabButton.focus();
        }
        props.removeDateRange();
    };

    const generateStartDateDisabledDays = (earliestDate) => {
    // handle the cutoff dates (preventing end dates from coming before
    // start dates or vice versa)
        const disabledDays = [earliestDate];

        if (props.endDate) {
            // the cutoff date represents the latest possible date
            disabledDays.push({
                after: props.endDate.toDate()
            });
        }

        return disabledDays;
    };

    const generateEndDateDisabledDays = (earliestDate) => {
        const disabledDays = [earliestDate];

        if (props.startDate) {
            // cutoff date represents the earliest possible date
            disabledDays.push({
                before: props.startDate.toDate()
            });
        }

        return disabledDays;
    };

    const earliestDateString =
            FiscalYearHelper.convertFYToDateRange(FiscalYearHelper.earliestFiscalYear)[0];
    const earliestDate = dayjs(earliestDateString, 'YYYY-MM-DD').toDate();

    const startDateDisabledDays = generateStartDateDisabledDays(earliestDate);
    const endDateDisabledDays = generateEndDateDisabledDays(earliestDate);

    let dateLabel = '';
    let hideTags = 'hide';
    if (props.selectedStart || props.selectedEnd) {
        hideTags = '';
        let start = null;
        let end = null;
        if (props.selectedStart) {
            start = dayjs(props.selectedStart, 'YYYY-MM-DD').format('MM/DD/YYYY');
        }
        if (props.selectedEnd) {
            end = dayjs(props.selectedEnd, 'YYYY-MM-DD').format('MM/DD/YYYY');
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
    if (!props.startDate && !props.endDate) {
        noDates = true;
    }

    const accessibility = {
        'aria-controls': 'selected-date-range'
    };

    return (
        <div className="date-range-option">
            <form
                className="date-range-wrapper"
                onSubmit={submitRange}>
                <DatePicker
                    type="startDate"
                    title="Action Date Start"
                    onDateChange={props.onDateChange}
                    value={props.startDate}
                    opposite={props.endDate}
                    showError={props.showError}
                    hideError={props.hideError}
                    disabledDays={startDateDisabledDays}
                    ref={(component) => {
                        setStartPicker(component);
                    }}
                    allowClearing />
                <DatePicker
                    type="endDate"
                    title="Action Date End"
                    onDateChange={props.onDateChange}
                    value={props.endDate}
                    opposite={props.startDate}
                    showError={props.showError}
                    hideError={props.hideError}
                    disabledDays={endDateDisabledDays}
                    ref={(component) => {
                        setEndPicker(component);
                    }}
                    allowClearing />
                <IndividualSubmit
                    className="set-date-submit"
                    onClick={submitRange}
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
                    onClick={removeRange}>
                    {dateLabel}
                    <span className="close">
                        <FontAwesomeIcon icon="times" />
                    </span>
                </button>
            </div>
        </div>
    );
};
DateRange.defaultProps = defaultProps;
DateRange.propTypes = propTypes;
export default DateRange;
