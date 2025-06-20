/**
 * DateRange.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { Button, NewPicker } from "data-transparency-ui";

import Analytics from 'helpers/analytics/Analytics';
import DatePicker from 'components/sharedComponents/DatePicker';
import { usePrevious } from "../../../../helpers/";
import dateRangeDropdownTimePeriods from '../../../../helpers/search/dateRangeDropdownHelper';
import ShownValue from "../otherFilters/ShownValue";
import { dateRangeChipLabel } from "../../../../helpers/searchHelper";

const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

dayjs.extend(isSameOrAfter);

const propTypes = {
    onDateChange: PropTypes.func,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    timePeriod: PropTypes.object,
    showError: PropTypes.func,
    hideError: PropTypes.func,
    removeDateRange: PropTypes.func,
    updateFilter: PropTypes.func,
    errorState: PropTypes.bool,
    header: PropTypes.string,
    errorMessage: PropTypes.string,
    setStartDate: PropTypes.func,
    setEndDate: PropTypes.func,
    startDateDropdown: PropTypes.object,
    endDateDropdown: PropTypes.object
};

const DateRange = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [startPicker, setStartPicker] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [endPicker, setEndPicker] = useState(null);
    const [dropdownDisabled, setDropdownDisabled] = useState(true);
    const [drDisabled, setDRDisabled] = useState(true);
    const [selectedDropdownOption, setSelectedDropdownOption] = useState('select');
    const [dropdownOptionSelected, setDropdownOptionSelected] = useState(false);
    const [noDatesDR, setNoDatesDR] = useState(false);
    const [noDatesDropdown, setNoDatesDropdown] = useState(false);
    const prevProps = usePrevious(props);
    const timePeriod = useSelector((state) => state.filters.time_period);
    const timePeriodApplied = useSelector((state) => state.appliedFilters.filters.time_period);

    const labelArray = [];

    const onClick = (e) => {
        setSelectedDropdownOption(e);

        if (e === 'select') {
            setDropdownOptionSelected(false);
            setNoDatesDropdown(true);
            props.onDateChange(null, 'startDateDropdown');
            props.onDateChange(null, 'endDateDropdown');
        }
        else {
            setDropdownOptionSelected(true);
            setNoDatesDropdown(false);
            Analytics.event({
                category: 'Date Range Dropdown',
                action: `View ${e}`
            });

            dateRangeDropdownTimePeriods.find((obj) => {
                if (obj.value === e) {
                    props.onDateChange(obj.startDate, 'startDateDropdown');
                    props.onDateChange(obj.endDate, 'endDateDropdown');
                    return true;
                }
                return false;
            });
        }
    };

    const localRemoveDateRange = (startDate, endDate, e) => {
        e.stopPropagation();
        if (e?.type === 'click' || (e.type === 'keyup' && e?.key === "Enter")) {
            setSelectedDropdownOption('select');
            let newValue = timePeriod;
            timePeriod.forEach((date) => {
                if (date.start_date === startDate && date.end_date === endDate) {
                    newValue = newValue.delete(date);
                }
            });
            props.removeDateRange(newValue);
        }
    };

    const dropdownOptions = [
        {
            name: 'Select a date range',
            value: 'select',
            onClick
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
        const start = props.startDate;
        const end = props.endDate;
        if (!props.errorState && (start || end)) {
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
        props.setStartDate(null);
        props.setEndDate(null);
    };

    const submitDatesDropdown = () => {
        const start = props.startDateDropdown;
        const end = props.endDateDropdown;
        if (!props.errorState && (start || end)) {
            let startValue = null;
            let endValue = null;
            if (start) {
                startValue = start.format('YYYY-MM-DD');
            }

            if (end) {
                endValue = end.format('YYYY-MM-DD');
            }

            let matchFound = false;
            let matchFoundApplied = false;
            // eslint-disable-next-line camelcase
            timePeriod.forEach((item) => {
                if (item.start_date === startValue && item.end_date === endValue) {
                    matchFound = true;
                    setNoDatesDropdown(true);
                }
            });

            timePeriodApplied.forEach((item) => {
                if (item.start_date === startValue && item.end_date === endValue) {
                    matchFoundApplied = true;
                    setNoDatesDropdown(true);
                }
            });

            if (timePeriodApplied.size > 0 && !matchFound) {
                props.updateFilter({
                    dateType: 'dr',
                    startDate: startValue,
                    endDate: endValue
                });
            }
            else if (!matchFound && !matchFoundApplied) {
                props.updateFilter({
                    dateType: 'dr',
                    startDate: startValue,
                    endDate: endValue
                });
            }
        }
        else {
            // user has cleared the dates, which means we should clear the date range filter
            props.updateFilter({
                dateType: 'dr',
                startDate: null,
                endDate: null
            });
        }
        // clean up picker with "add" click
        setSelectedDropdownOption('select');
    };

    const testDates = () => {
        if (props.startDate === null && props.endDate === null) {
            if (props.errorState) {
                props.showError(props.header, props.errorMessage);
            }
            return;
        }

        if (props.startDate !== null &&
            props.endDate !== null &&
            props.startDate.isValid() &&
            props.endDate.isValid() &&
            !props.endDate.isSameOrAfter(props.startDate)
        ) {
            // end date comes before start date, invalid
            // show an error message
            props.showError('Invalid Dates',
                'The end date cannot be earlier than the start date.'
            );
            return;
        }

        if (props.startDate !== null && props.startDate.isBefore('2007-10-01')) {
            props.showError('Invalid Start Date',
                'Please select a date after 10/01/2007.'
            );
            setNoDatesDR(true);
            return;
        }

        if (props.endDate !== null && props.endDate.isBefore('2007-10-01')) {
            props.showError('Invalid End Date',
                'Please select a date after 10/01/2007.'
            );
            setNoDatesDR(true);
            return;
        }

        const format = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;

        if (props.startDate !== null) {
            const newDateFormat = dayjs(props.startDate).format('YYYY-MM-DD');
            const formatTest = format.test(newDateFormat);

            if (!formatTest) {
                setNoDatesDR(true);
                props.showError('Invalid Dates', 'Please enter a valid date in MM/DD/YYYY format.');
            }
        }

        if (props.endDate !== null) {
            const newDateFormat = dayjs(props.endDate).format('YYYY-MM-DD');
            const formatTest = format.test(newDateFormat);

            if (!formatTest) {
                setNoDatesDR(true);
                props.showError('Invalid Dates', 'Please enter a valid date in MM/DD/YYYY format.');
            }
        }
    };

    useEffect(() => {
        // where we should handle setting no dates
        if (!props.startDate && !props.endDate) {
            setNoDatesDR(true);
            props.hideError();
        }
        else {
            setNoDatesDR(false);
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props.endDate, props.startDate]);

    useEffect(() => {
        // where we should handle setting no dates
        if (!props.startDateDropdown && !props.endDateDropdown) {
            setNoDatesDropdown(true);
            props.hideError();
        }
        else {
            setNoDatesDropdown(false);
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props.endDateDropdown, props.startDateDropdown]);

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
        // date range disabling
        if (!noDatesDR) {
            setDRDisabled(false);
            testDates();
        }
        else if (noDatesDR) {
            setDRDisabled(true);
        }

        // dropdown disabling
        if (!noDatesDropdown) {
            setDropdownDisabled(false);
        }
        else {
            setDropdownDisabled(true);
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [
        props.errorState,
        noDatesDR,
        noDatesDropdown,
        props.startDate,
        props.endDate,
        props.startDateDropdown,
        props.endDateDropdown,
        props.onDateChange,
        dropdownOptionSelected
    ]);

    if (props.timePeriod?.size > 0) {
        for (const timeinput of props.timePeriod) {
            const dateLabel = dateRangeChipLabel(timeinput);

            if (dateLabel !== '') {
                labelArray.push({
                    dateLabel, startDate: timeinput.start_date, endDate: timeinput.end_date
                });
            }
        }
    }
    return (
        <div className="date-range-option">
            <form
                className="date-range-wrapper"
                onSubmit={submitDates}>
                <div className="date-range-column">
                    <DatePicker
                        value={props.startDate}
                        type="startDate"
                        onDateChange={props.onDateChange}
                        hideError={props.hideError}
                        title="start date"
                        id="date-range__startDate"
                        min="2007-10-01" />
                </div>
                <div className="date-range-column">
                    <DatePicker
                        value={props.endDate}
                        type="endDate"
                        onDateChange={props.onDateChange}
                        hideError={props.hideError}
                        title="end date"
                        id="date-range__endDate"
                        min="2007-10-01" />
                </div>
                <Button
                    copy="Add"
                    buttonTitle="Add"
                    buttonSize="sm"
                    buttonType="primary"
                    backgroundColor="light"
                    disabled={drDisabled}
                    onClick={submitDates} />
            </form>
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
                                ? dropdownOptions?.find(
                                    (obj) => obj.value === selectedDropdownOption)?.name
                                : `${selectedDropdownOption}`}
                            sortFn={sortFn} />
                    </div>
                    <Button
                        copy="Add"
                        buttonTitle="Add"
                        buttonSize="sm"
                        buttonType="primary"
                        backgroundColor="light"
                        disabled={dropdownDisabled}
                        onClick={submitDatesDropdown} />
                </div>
            </div>
            <div
                className="selected-filters"
                id="selected-date-range"
                role="status">
                {labelArray.map(({ dateLabel, startDate, endDate }, index) =>
                    (
                        <ShownValue
                            key={index}
                            label={dateLabel}
                            removeValue={(e) => localRemoveDateRange(startDate, endDate, e)} />
                    )
                )}

            </div>
        </div>
    );
};

DateRange.propTypes = propTypes;
export default DateRange;
