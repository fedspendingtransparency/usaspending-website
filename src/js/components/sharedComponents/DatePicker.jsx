/**
  * DatePicker.jsx
  * Created by Kevin Li 7/25/16
  **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

const dayjs = require('dayjs');

const defaultProps = {
    type: 'startDate',
    allowClearing: false,
    disabledDays: []
};

const propTypes = {
    value: PropTypes.object,
    type: PropTypes.string,
    onDateChange: PropTypes.func,
    showError: PropTypes.func,
    hideError: PropTypes.func,
    opposite: PropTypes.object,
    title: PropTypes.string,
    allowClearing: PropTypes.bool,
    disabledDays: PropTypes.array,
    onFocus: PropTypes.func,
    id: PropTypes.string
};

const DatePicker = (props) => {
    const [inputValue, setInputValue] = useState('');

    const clearValue = () => {
        setInputValue('');
    };

    const parseValueForInput = () => {
        // convert the date to something typeable
        if (props.value != null) {
            const iV = props.value.format('MM/DD/YYYY');
            setInputValue(iV);
        }
    };

    const handleDatePick = (day) => {
        props.onDateChange(day, props.type);
        props.hideError();
    };

    const handleTypedDate = (e) => {
        setInputValue(e.target.value);
        if (e.target.value === '') {
            // if the input is an empty string, this indicates the user wants to clear the date
            clearValue();
            return;
        }

        // check if this meets the MM/DD/YYYY format requirement
        let format = 'MM/DD/YYYY';
        const primaryFormat = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
        // secretly check for a secondary format
        const secondaryFormat = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/;

        const matchedFirst = primaryFormat.test(e.target.value);
        const matchedSecond = secondaryFormat.test(e.target.value);

        if (!matchedFirst && !matchedSecond) {
            // doesn't match either format, user may still be typing or just entered invalid data
            return;
        }
        else if (!matchedFirst && matchedSecond) {
            // only matched the second format
            format = 'M/D/YYYY';
        }

        // determine if this is a parseable date
        const date = dayjs(e.target.value, format);
        if (date.isValid()) {
            // it's a valid date
            handleDatePick(date.toDate());
        }
    };

    // don't know if this is necessary anymore
    // const handleInputBlur = () => {
    //     if (inputValue.length > 0 && !props.value) {
    //         // user entered something into the input field and no date has been set yet,
    //         // input must have been invalid
    //         props.showError('Invalid Date', 'The date entered is not a valid date.');
    //         setInputValue('');
    //     }
    //     else if (inputValue.length > 0) {
    //         parseValueForInput();
    //     }
    // };

    useEffect(() => {
        parseValueForInput();
    }, [props.value]);
    const labelId = `picker-${uniqueId()}`;

    return (
        <div className="generate-datepicker-wrap">
            <div className="generate-datepicker">
                <label htmlFor={labelId}>
                    <span className="generate-datepicker__label">{props.title}</span>
                    <input
                        id={props.id}
                        type="text"
                        placeholder="mm/dd/yyyy"
                        aria-label={props.title}
                        value={inputValue}
                        onChange={handleTypedDate} />
                </label>
            </div>
        </div>
    );
};
DatePicker.defaultProps = defaultProps;
DatePicker.propTypes = propTypes;

export default DatePicker;
