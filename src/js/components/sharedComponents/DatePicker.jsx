/**
  * DatePicker.jsx
  * Created by Kevin Li 7/25/16
  **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

const dayjs = require('dayjs');

const propTypes = {
    type: PropTypes.string,
    onDateChange: PropTypes.func,
    hideError: PropTypes.func,
    title: PropTypes.string,
    id: PropTypes.string
};

const DatePicker = ({
    type = 'startDate',
    onDateChange,
    hideError,
    title,
    id
}) => {
    const [inputValue, setInputValue] = useState('');

    const clearValue = (e) => {
        setInputValue('');
        if (e.target.id.includes("startDate")) {
            onDateChange(null, 'startDate');
        }
        else if (e.target.id.includes("endDate")) {
            onDateChange(null, 'endDate');
        }
    };

    const handleDatePick = (day) => {
        onDateChange(day, type);
        hideError();
    };

    const handleTypedDate = (e) => {
        if (e.target.value === '') {
            // if the input is an empty string, this indicates the user wants to clear the date
            clearValue(e);
            return;
        }

        setInputValue(e.target.value);

        // determine if this is a parseable date
        const date = dayjs(e.target.value, 'MM/DD/YYYY');
        if (date.isValid()) {
            // it's a valid date
            handleDatePick(date.toDate());
        }
    };

    const labelId = `picker-${uniqueId()}`;

    return (
        <div className="generate-datepicker-wrap">
            <div className="generate-datepicker">
                <label htmlFor={labelId}>
                    <span className="generate-datepicker__label">{title}</span>
                    <input
                        id={id}
                        type="date"
                        placeholder="mm/dd/yyyy"
                        aria-label={title}
                        value={inputValue}
                        onChange={handleTypedDate}
                        onBlur={handleTypedDate} />
                </label>
            </div>
        </div>
    );
};
DatePicker.propTypes = propTypes;

export default DatePicker;
