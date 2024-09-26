/**
 * DateRange.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';
import { Button } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from 'components/sharedComponents/DatePicker';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import { usePrevious } from "../../../../helpers/";
import NewPicker from "../../../sharedComponents/dropdowns/NewPicker";
import FeatureFlag from "../../../sharedComponents/FeatureFlag";
import dateRangeDropdownTimePeriods from '../../../../helpers/search/dateRangeDropdownHelper';

const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

dayjs.extend(isSameOrAfter);

const propTypes = {
    onDateChange: PropTypes.func,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    selectedStart: PropTypes.string,
    selectedEnd: PropTypes.string,
    showError: PropTypes.func,
    hideError: PropTypes.func,
    applyDateRange: PropTypes.func,
    removeDateRange: PropTypes.func,
    updateFilter: PropTypes.func,
    errorState: PropTypes.bool,
    header: PropTypes.string,
    errorMessage: PropTypes.string
};

const DateRange = (props) => {
    const [startPicker, setStartPicker] = useState(null);
    const [endPicker, setEndPicker] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [selectedDropdownOption, setSelectedDropdownOption] = useState('select');
    const [dropdownOptionSelected, setDropdownOptionSelected] = useState(false);
    const [noDates, setNoDates] = useState(false);
    const prevProps = usePrevious(props);

    const onClick = (e) => {
        setSelectedDropdownOption(e);
        setDropdownOptionSelected(true);

        Analytics.event({
            category: 'Date Range Dropdown',
            action: `View ${e}`
        });

        dateRangeDropdownTimePeriods.find((obj) => {
            if (obj.value === e) {
                props.onDateChange(obj.startDate, 'startDate');
                props.onDateChange(obj.endDate, 'endDate');
                return true;
            }
            return false;
        });
    };

    const clearDropdownOption = () => {
        setSelectedDropdownOption('select');
        setDropdownOptionSelected(false);
    };

    const dropdownOptions = [
        {
            name: 'Select a date range',
            value: 'select',
            onClick: clearDropdownOption
        },
        {
            name: 'Yesterday',
            value: 'yesterday',
            onClick
        },
        {
            name: 'Last 7 days',
            value: 'last-seven-days',
            onClick
        },
        {
            name: 'Last 15 days',
            value: 'last-fifteen-days',
            onClick
        },
        {
            name: 'Last 30 days',
            value: 'last-thirty-days',
            onClick
        },
        {
            name: 'Last 60 days',
            value: 'last-sixty-days',
            onClick
        },
        {
            name: 'This month',
            value: 'current-month',
            onClick
        },
        {
            name: 'Last 3 months',
            value: 'last-three-months',
            onClick
        },
        {
            name: 'Last 6 months',
            value: 'last-six-months',
            onClick
        },
        {
            name: 'Last 12 months',
            value: 'last-twelve-months',
            onClick
        },
        {
            name: 'Last year (Jan - Dec)',
            value: 'last-calendar-year',
            onClick
        },
        {
            name: 'Year-to-date (Jan - today)',
            value: 'year-to-date',
            onClick
        }
    ];

    const sortFn = () => dropdownOptions;

    const submitDates = () => {
        // validate that dates are provided for both fields and the end dates
        // don't come before the start dates
        // validate the date ranges
        const start = props.startDate;
        const end = props.endDate;
        if (!props.errorState && (start || end)) {
            // open-ended date range
            let startValue = null;
            let endValue = null;
            if (start) {
                startValue = start.format('YYYY-MM-DD');
            }

            if (end) {
                endValue = end.format('YYYY-MM-DD');
            }

            props.updateFilter({
                dateType: 'dr',
                startDate: startValue,
                endDate: endValue
            });
        }
        else {
            // user has cleared the dates, which means we should clear the date range filter
            props.updateFilter({
                dateType: 'dr',
                startDate: null,
                endDate: null
            });
        }
    };

    const submitRange = (e) => {
    // allow the user to change date ranges by keyboard and pressing enter
        e.preventDefault();
        submitDates();
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

    const testDates = () => {
        if (props.startDate === null && props.endDate === null) {
            if (props.errorState) {
                props.showError(props.header, props.errorMessage);
            }
            return;
        }
        if (props.startDate !== null && props.endDate !== null && props.startDate.isValid() && props.endDate.isValid() && !props.endDate.isSameOrAfter(props.startDate)) {
            // end date comes before start date, invalid
            // show an error message
            props.showError('Invalid Dates',
                'The end date cannot be earlier than the start date.');
        }
    };

    const onFocus = () => {
        testDates();
    };

    useEffect(() => {
        if (!props.startDate && !props.endDate && !dropdownOptionSelected) {
            setNoDates(true);
        }
        else {
            setNoDates(false);
            // we need this in cases where the error message is showing and the user selects an option from the dropdown
            props.hideError();
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props.endDate, props.startDate, dropdownOptionSelected]);

    useEffect(() => {
        if (prevProps?.startDate !== props?.startDate && !props?.startDate) {
            // the start date was reset to null, clear the picker
            startPicker?.clearValue();
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props?.startDate]);

    useEffect(() => {
        if (prevProps?.endDate !== props?.endDate && !props?.endDate) {
            // the end date was reset to null, clear the picker
            endPicker?.clearValue();
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props?.endDate]);

    useEffect(() => {
        if (noDates || props.errorState) {
            setDisabled(true);
        }
        else {
            setDisabled(false);
        }
        testDates();
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props.errorState, noDates, props.startDate, props.endDate]);

    return (
        <div className="date-range-option">
            <form
                className="date-range-wrapper"
                onSubmit={submitRange}>
                <div className="date-range-column">
                    <DatePicker
                        type="startDate"
                        title="start date"
                        onDateChange={props.onDateChange}
                        value={props.startDate}
                        opposite={props.endDate}
                        showError={props.showError}
                        hideError={props.hideError}
                        disabledDays={startDateDisabledDays}
                        ref={(component) => {
                            setStartPicker(component);
                        }}
                        id="date-range__startDate"
                        onFocus={onFocus}
                        allowClearing />
                </div>
                <div className="date-range-column">
                    <DatePicker
                        type="endDate"
                        title="end date"
                        onDateChange={props.onDateChange}
                        value={props.endDate}
                        opposite={props.startDate}
                        showError={props.showError}
                        hideError={props.hideError}
                        disabledDays={endDateDisabledDays}
                        onFocus={onFocus}
                        ref={(component) => {
                            setEndPicker(component);
                        }}
                        id="date-range__endDate"
                        allowClearing />
                </div>
                <Button
                    copy="Add"
                    buttonTitle="Add"
                    buttonSize="sm"
                    buttonType="primary"
                    backgroundColor="light"
                    disabled={disabled}
                    onClick={submitRange} />
            </form>
            <FeatureFlag>
                <div className="date-range-option__dropdown-section">
                    <div className="date-range-option__dropdown-section-top">
                        <div className="date-range-option__dropdown-section-label">
                            Date Ranges
                        </div>
                    </div>
                    <div className="date-range-option__dropdown-section-bottom">
                        <div className="date-range-option__dropdown-section-picker-wrapper">
                            <NewPicker
                                leftIcon=""
                                size="sm"
                                options={dropdownOptions}
                                enabled
                                selectedOption={dropdownOptions?.length
                                    ? dropdownOptions?.find((obj) => obj.value === selectedDropdownOption)?.name
                                    : `${selectedDropdownOption}`}
                                sortFn={sortFn} />
                        </div>
                        <Button
                            copy="Add"
                            buttonTitle="Add"
                            buttonSize="sm"
                            buttonType="primary"
                            backgroundColor="light"
                            disabled={disabled}
                            onClick={submitRange} />
                    </div>
                </div>
            </FeatureFlag>
            <div
                className={`selected-filters ${hideTags}`}
                id="selected-date-range"
                aria-hidden={noDates}
                role="status">
                <button
                    className="shown-filter-button"
                    title="Click to remove filter."
                    aria-label={`Applied date range: ${dateLabel}`}
                    onClick={props.removeDateRange}>
                    {dateLabel}
                    <span className="close">
                        <FontAwesomeIcon icon="times" />
                    </span>
                </button>
            </div>
        </div>
    );
};

// DateRange.defaultProps = defaultProps;
DateRange.propTypes = propTypes;
export default DateRange;
