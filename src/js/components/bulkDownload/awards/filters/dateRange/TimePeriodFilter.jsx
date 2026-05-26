/**
 * TimePeriodFilter.jsx
 * Created by Lizzie Salita 11/1/17
 **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';
import ComboBox from "components/sharedComponents/ComboBox";
import DateRangeError from 'components/search/filters/timePeriod/DateRangeError';

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

// const errorTypes = {
//     order: {
//         title: 'Invalid Dates',
//         message: 'The end date cannot be earlier than the start date.'
//     },
//     range: {
//         title: 'Invalid Date Range',
//         message: 'Choose one of the ranges below or set your own range of one year or less.'
//     }
// };

const TimePeriodFilter = (props) => {
    const [startDateBulkUI, setStartDateBulkUI] = useState(null);
    const [endDateBulkUI, setEndDateBulkUI] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [currentTimeType, setCurrentTimeType] = useState("time_period");

    let errorDetails = null;
    let icon = (
        <div className="icon valid">
            <CheckCircle />
        </div>
    );

    if (!props.valid || errorMessage !== '') {
        icon = (
            <div className="icon invalid">
                <ExclamationCircle />
            </div>
        );
    }

    if (errorMessage !== '') {
        errorDetails = (<DateRangeError
            header={errorTitle}
            message={errorMessage} />);
    }

    const handleError = (title = '', message = '') => {
        setErrorTitle(title);
        setErrorMessage(message);
    };

    const handleDateChange = (date, dateType) => {
        let value = dayjs(date);
        if (!date) {
            value = null;
        }

        if (dateType === "startDateBulk") {
            setStartDateBulkUI(value);
        }

        if (dateType === "endDateBulk") {
            setEndDateBulkUI(value);
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
            value: `${fyDateRange[1]} - ${fyDateRange[0]}`
        });
    }

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
                {/* conditional */}
                {currentTimeType === "time_period" ? (
                    <div className="combo-box-container">
                        <ComboBox
                            optionsArray={periodOptions}
                            onSelect={handleDateChange}
                            formName="time-period-combo"
                            label={<>Time Period <span className="required">(Required)</span></>}
                            placeholder="Select time period" />
                    </div>
                ) : (
                    <div className="date-range-wrapper">
                        <DownloadDateRange
                            datePlaceholder=""
                            startDate={startDateBulkUI}
                            endDate={endDateBulkUI}
                            onDateChange={handleDateChange}
                            showError={handleError}
                            hideError={handleError} />
                        { errorDetails }
                    </div>
                )}
                <p className="download-filter__content-note">
                    <span className="download-filter__content-note_bold">Note: </span>
                            Note: data is available for download from 10/01/2000 (FY 2001) - present.
                </p>
            </div>
        </div>
    );
};

TimePeriodFilter.propTypes = propTypes;
export default TimePeriodFilter;
