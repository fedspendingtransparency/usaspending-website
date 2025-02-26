/**
 * DateRange.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import Analytics from 'helpers/analytics/Analytics';
import { Button } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from 'components/sharedComponents/DatePicker';
import { usePrevious } from "../../../../helpers/";
import NewPicker from "../../../sharedComponents/dropdowns/NewPicker";
import dateRangeDropdownTimePeriods from '../../../../helpers/search/dateRangeDropdownHelper';

const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

dayjs.extend(isSameOrAfter);

const propTypes = {
    onDateChange: PropTypes.func,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    timePeriod: PropTypes.object,
    selectedStart: PropTypes.string,
    selectedEnd: PropTypes.string,
    showError: PropTypes.func,
    hideError: PropTypes.func,
    removeDateRange: PropTypes.func,
    updateFilter: PropTypes.func,
    errorState: PropTypes.bool,
    header: PropTypes.string,
    errorMessage: PropTypes.string
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

    const localRemoveDateRange = (e) => {
        e.stopPropagation();
        if (e?.type === 'click' || (e.type === 'keyup' && e?.key === "Enter")) {
            setSelectedDropdownOption('select');
            props.removeDateRange(e);
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
            } else if (!matchFound && !matchFoundApplied) {
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
    };

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
        // where we should handle setting no dates
        if (!props.startDate && !props.endDate) {
            setNoDatesDR(true);
            props.hideError();
        } else {
            setNoDatesDR(false);
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props.endDate, props.startDate]);

    useEffect(() => {
        // where we should handle setting no dates
        if (!props.startDateDropdown && !props.endDateDropdown) {
            setNoDatesDropdown(true);
            props.hideError();
        } else {
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
        } else if (noDatesDR) {
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
    }, [props.errorState, noDatesDR, noDatesDropdown, props.startDate, props.endDate, props.startDateDropdown, props.endDateDropdown, props.onDateChange, dropdownOptionSelected]);

    if (props.timePeriod?.size > 0) {
        for (const timeinput of props.timePeriod) {
            let dateLabel = '';
            let start = null;
            let end = null;

            if (timeinput.start_date) {
                start = dayjs(timeinput.start_date, 'YYYY-MM-DD').format('MM/DD/YYYY');
            }
            if (timeinput.end_date) {
                end = dayjs(timeinput.end_date, 'YYYY-MM-DD').format('MM/DD/YYYY');
            }

            if (start && end) {
                dateLabel = `${start} to ${end}`;
            }
            else if (start) {
                dateLabel = `${start} to present`;
            }
            else if (end) {
                dateLabel = `... to ${end}`;
            }

            if (dateLabel !== '') {
                labelArray.push(dateLabel);
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
                        type="startDate"
                        title="start date"
                        onDateChange={props.onDateChange}
                        value={props.startDate}
                        opposite={props.endDate}
                        showError={props.showError}
                        hideError={props.hideError}
                        id="date-range__startDate"
                        onFocus={onFocus}
                        updateFilter={props.updateFilter} />
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
                        onFocus={onFocus}
                        updateFilter={props.updateFilter}
                        id="date-range__endDate" />
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
                        disabled={dropdownDisabled}
                        onClick={submitDatesDropdown} />
                </div>
            </div>
            <div
                className="selected-filters"
                id="selected-date-range"
                role="status">
                {labelArray.map((dateLabel, index) =>
                    (
                        <button
                            key={index}
                            className="shown-filter-button"
                            title="Click to remove filter."
                            data-index={index}
                            aria-label={`Applied date range: ${dateLabel}`}
                            onClick={localRemoveDateRange}>
                            {dateLabel}
                            <span className="close">
                                <FontAwesomeIcon icon="times" data-index={index} />
                            </span>
                        </button>
                    )
                )}

            </div>
        </div>
    );
};

DateRange.propTypes = propTypes;
export default DateRange;
