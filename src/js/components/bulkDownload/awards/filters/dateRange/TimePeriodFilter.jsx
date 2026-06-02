/**
 * TimePeriodFilter.jsx
 * Created by Lizzie Salita 11/1/17
 **/

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';
import ComboBox from "components/sharedComponents/ComboBox";

import {
    allFiscalYears,
    convertFYToDateRange
} from 'helpers/fiscalYearHelper';
import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';

import DownloadDateRange from './DownloadDateRange';

const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

dayjs.extend(isSameOrAfter);

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
        message: 'The end date cannot be earlier than the start date.',
        type: 'end',
        active: true
    },
    range: {
        title: 'Invalid Date Range',
        message: 'Date range cannot span more than one year.',
        type: 'end',
        active: true
    },
    invalid: {
        title: 'Invalid Date',
        message: 'Invalid date',
        active: true
    },
    incomplete: {
        title: 'Incomplete',
        message: 'Date range must have a state date and end date.',
        type: null,
        active: true
    },
    empty: {
        title: "",
        message: "",
        type: null,
        active: false
    }
};

const TimePeriodFilter = ({
    filterTimePeriodStart,
    filterTimePeriodEnd,
    updateStartDate,
    updateEndDate,
    valid,
    setValidDates
}) => {
    const [startDateBulkUI, setStartDateBulkUI] = useState(filterTimePeriodStart);
    const [endDateBulkUI, setEndDateBulkUI] = useState(filterTimePeriodEnd);
    const [error, setError] = useState(errorTypes.empty);
    const [currentTimeType, setCurrentTimeType] = useState("time_period");
    let defaultValue = '';

    let icon = (
        <div className="icon valid">
            <CheckCircle />
        </div>
    );

    if (!valid || error.active) {
        icon = (
            <div className="icon invalid">
                <ExclamationCircle />
            </div>
        );
    }

    const validateDates = useCallback(() => {
        // validate the date ranges
        const start = dayjs.isDayjs(startDateBulkUI)
            ? startDateBulkUI
            : dayjs(startDateBulkUI);
        const end = dayjs.isDayjs(endDateBulkUI)
            ? endDateBulkUI
            : dayjs(endDateBulkUI);

        const yearBeforeEnd = dayjs(endDateBulkUI).subtract(1, 'y');

        if (start.isValid() && end.isValid()) {
            // both sets of dates exist
            if (!end.isSameOrAfter(start)) {
                // end date comes before start date, invalid
                // show an error message
                setError(errorTypes.order);
            }
            else if (!start.isSameOrAfter(yearBeforeEnd)) {
                // Start date is more than one year before the end date
                // show an error message
                setError(errorTypes.range);
            }
            else {
                // valid!
                setError(errorTypes.empty);
                // update the filter parameters
                updateStartDate(start.format('YYYY-MM-DD'));
                updateEndDate(end.format('YYYY-MM-DD'));
                setValidDates(true);
            }
        }
        else if (start.isValid() || end.isValid()) {
            // open-ended date range
            let startValue = null;
            let endValue = null;
            let errorMessage = errorTypes.incomplete;

            if (start.isValid()) {
                startValue = start.format('YYYY-MM-DD');
                errorMessage = {
                    ...errorMessage,
                    type: 'end'
                };
                updateStartDate(startValue);
                setValidDates(false);
                setError(errorMessage);
            }
            else {
                // already checked if end is valid above
                // if start is not valid end must be.
                endValue = end.format('YYYY-MM-DD');
                errorMessage = {
                    ...errorMessage,
                    type: 'start'
                };
                setError(errorMessage);
                updateEndDate(endValue);
                setValidDates(false);
            }
        }
        else {
            // user has cleared the dates, which means we should clear the date range filter
            updateStartDate('');
            updateEndDate('');
            setValidDates(false);
        }
    }, [endDateBulkUI, setValidDates, startDateBulkUI, updateEndDate, updateStartDate]);

    const handleDateUpdate = (start = "", end = "") => {
        setStartDateBulkUI(start);
        setEndDateBulkUI(end);
        if (start === "" && end === "") {
            // allow for users to clear combo selection
            updateStartDate('');
            updateEndDate('');
            setValidDates(false);
        }
    };

    const handleComboDateChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        if (value) {
            const [start, end] = value.split(" - ")
                .map((date) => dayjs(date.trim()));

            handleDateUpdate(start, end);
        }
    };

    const handleDateChange = (date, dateType) => {
        let value = dayjs(date);
        let errorMessage = errorTypes.invalid;
        if (!date) {
            value = null;
        }

        if (dateType === "startDateBulk") {
            if (value?.isValid()) {
                setStartDateBulkUI(value);
            }
            else if (date === "") {
                // user want to clear picker
                setStartDateBulkUI('');
                updateStartDate('');
                setValidDates(false);
            }
            else {
                errorMessage = {
                    ...errorMessage,
                    type: 'start'
                };
                setError(errorMessage);
                setValidDates(false);
            }
        }

        if (dateType === "endDateBulk") {
            if (value?.isValid()) {
                setEndDateBulkUI(value);
            }
            else if (date === "") {
                // user want to clear picker
                setEndDateBulkUI('');
                updateEndDate('');
                setValidDates(false);
            }
            else {
                errorMessage = {
                    ...errorMessage,
                    type: 'end'
                };
                setError(errorMessage);
                setValidDates(false);
            }
        }
    };

    // comboBox options data manipulation
    const periodOptions = awardDownloadOptions.dateRangeButtons.map((range) => (
        {
            text: range.label,
            value: `${range.startDate} - ${range.endDate}`
        }
    ));

    for (const year of allFiscalYears(2001)) {
        const fyDateRange = convertFYToDateRange(year);
        periodOptions.push({
            text: `FY ${year}`,
            value: `${fyDateRange[0]} - ${fyDateRange[1]}`
        });
    }

    if (startDateBulkUI && endDateBulkUI) {
        const start = dayjs.isDayjs(startDateBulkUI)
            ? startDateBulkUI.format('YYYY-MM-DD')
            : startDateBulkUI;
        const end = dayjs.isDayjs(endDateBulkUI)
            ? endDateBulkUI.format('YYYY-MM-DD')
            : endDateBulkUI;

        const searchValue = `${start} - ${end}`;
        const persistedOption = periodOptions.find((option) => option.value === searchValue);

        if (persistedOption) {
            defaultValue = persistedOption.text;
        }
    }

    // end comboBox options data manipulation

    useEffect(() => {
        setStartDateBulkUI(filterTimePeriodStart);
    }, [filterTimePeriodStart]);

    useEffect(() => {
        setEndDateBulkUI(filterTimePeriodEnd);
    }, [filterTimePeriodEnd]);

    useEffect(() => {
        const isSameAsRedux = (
            startDateBulkUI === filterTimePeriodStart
            &&
            endDateBulkUI === filterTimePeriodEnd
        );

        if (isSameAsRedux) return;

        validateDates();
    // don't need prop validation here.
    // handled in above useEffects
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDateBulkUI, endDateBulkUI, validateDates]);

    const timePeriodTypeList = awardDownloadOptions.timePeriodTypes.map((periodType) => (
        <div
            className="radio"
            key={periodType.name}>
            <label className="radio-label" htmlFor="periodType">
                <input
                    type="radio"
                    aria-label={periodType.name}
                    value={periodType.name}
                    name="periodType"
                    checked={currentTimeType === periodType.name}
                    onChange={() => setCurrentTimeType(periodType.name)} />
                <div className="radio-container">
                    {periodType.label}
                    <div className="radio-description">
                        {periodType.description}
                    </div>
                </div>
            </label>
        </div>
    ));

    return (

        <div className="download-filter">
            <h3 className="download-filter__title">
                {icon} Select a <span className="download-filter__title_em">date range</span>.
            </h3>
            <div className="download-filter__content time-period">
                <div className="input-container">
                    {timePeriodTypeList}
                </div>
                {currentTimeType === "time_period" ? (
                    <div className="combo-box-container">
                        <ComboBox
                            optionsArray={periodOptions}
                            onSelect={handleComboDateChange}
                            onClearSelect={handleDateUpdate}
                            formName="time-period-combo"
                            label={<>Time Period <span className="required">(Required)</span></>}
                            placeholder="Select time period"
                            defaultValue={defaultValue} />
                    </div>
                ) : (
                    <DownloadDateRange
                        datePlaceholder=""
                        startDate={startDateBulkUI}
                        endDate={endDateBulkUI}
                        onDateChange={handleDateChange}
                        error={error} />
                )}

                <p className="download-filter__content-note">
                    <span className="download-filter__content-note_bold">Note: </span>
                        data is available for download from 10/01/2000 (FY 2001) - present.
                </p>
            </div>
        </div>
    );
};

TimePeriodFilter.propTypes = propTypes;
export default TimePeriodFilter;
