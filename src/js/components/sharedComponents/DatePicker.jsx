/**
  * DatePicker.jsx
  * Created by Kevin Li 7/25/16
  **/

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash-es';

const dayjs = require('dayjs');

const propTypes = {
    value: PropTypes.string,
    type: PropTypes.string,
    onDateChange: PropTypes.func,
    hideError: PropTypes.func,
    title: PropTypes.string,
    id: PropTypes.string,
    min: PropTypes.string
};

const DatePicker = ({
    value,
    type = 'startDate',
    onDateChange,
    hideError,
    title,
    id,
    min
}) => {
    const [inputValue, setInputValue] = useState('');

    const labelId = `picker-${uniqueId()}`;

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
        const date = dayjs(e.target.value, 'YYYY-MM-DD');
        if (date.isValid()) {
            // it's a valid date
            handleDatePick(date.toDate());
        }
    };

    useEffect(() => {
        if (value === '' || value === null) {
            clearValue({ target: { id: '' } });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div className="generate-datepicker-wrap">
            <div className="generate-datepicker">
                <label htmlFor={labelId}>
                    <span className="generate-datepicker__label">{title}</span>
                    <input
                        className="date-picker__input-field"
                        id={id}
                        type="date"
                        placeholder="mm/dd/yyyy"
                        aria-label={title}
                        value={inputValue}
                        min={min}
                        onChange={handleTypedDate}
                        onBlur={handleTypedDate} />
                </label>
            </div>
        </div>
    );
};
DatePicker.propTypes = propTypes;

export default DatePicker;
