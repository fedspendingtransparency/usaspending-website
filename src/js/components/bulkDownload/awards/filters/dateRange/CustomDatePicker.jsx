/**
  * CustomDatePicker.jsx
  * Created by JD House 5/22/2026
  **/

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash-es';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ExclamationCircle } from 'components/sharedComponents/icons/Icons';

const dayjs = require('dayjs');


const propTypes = {
    value: PropTypes.string,
    type: PropTypes.string,
    onDateChange: PropTypes.func,
    title: PropTypes.string,
    min: PropTypes.string,
    error: PropTypes.object
};


// possibly move to helpers
const dayNames = ["S", "M", "T", "W", "Th", "F", "S"];

const buildCalendarDays = (viewDate) => {
    const startOfMonth = viewDate.startOf("month");
    const endOfMonth = viewDate.endOf("month");
    const daysInMonth = viewDate.daysInMonth();
    const firstDayOfWeek = startOfMonth.day();

    const days = [];

    // leading days from previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        days.push({ date: startOfMonth.subtract(i + 1, "day"), outside: true });
    }

    // current month days
    for (let d = 0; d < daysInMonth; d++) {
        days.push({ date: startOfMonth.add(d, "day"), outside: false });
    }

    // trailing days to complete grid
    const trailing = 42 - days.length;
    for (let t = 1; t <= trailing; t++) {
        days.push({ date: endOfMonth.add(t, "day"), outside: true });
    }

    return days;
};

const autoFormatInput = (text) => {
    const digits = text.replace(/\D/g, "");
    let formatted = digits.substring(0, 2);
    if (digits.length >= 3) {
        formatted = `${formatted}/${digits.substring(2, 4)}`;
    }

    if (digits.length >= 5) {
        formatted = `${formatted}/${digits.substring(4, 8)}`;
    }

    return formatted;
};

const parseInputDate = (value) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length !== 8) return null;

    const parsed = dayjs(
        `${digits.substring(4, 8)}-${digits.substring(0, 2)}-${digits.substring(2, 4)}`
    );
    return parsed.isValid() ? parsed : null;
};

// end possibly move to helpers


// eslint-disable-next-line prefer-arrow-callback
const CustomDatePicker = memo(function CustomDatePicker({
    value,
    type = 'startDate',
    onDateChange,
    title,
    min,
    error = { active: false }
}) {
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(dayjs().startOf("month"));
    const [selectedDate, setSelectedDate] = useState("");

    const pickerRef = useRef(null);

    const calendarDays = buildCalendarDays(viewDate);

    const toggleMonth = useCallback((forward) => {
        if (forward) {
            setViewDate((prev) => (
                prev.add(1, "month")
            ));
        }
        else {
            setViewDate((prev) => (
                prev.subtract(1, "month")
            ));
        }
    }, []);

    const toggleYear = useCallback((forward) => {
        if (forward) {
            setViewDate((prev) => (
                prev.add(1, "year")
            ));
        }
        else {
            setViewDate((prev) => (
                prev.subtract(1, "year")
            ));
        }
    }, []);

    const selectDay = useCallback((date) => {
        setSelectedDate(date);
        setInputValue(date.format("MM/DD/YYYY"));
        setViewDate(date.startOf("month"));
        setIsOpen(false);
        onDateChange(date, type);
    }, [onDateChange, type]);

    const handleInputChange = (e) => {
        const formatted = autoFormatInput(e.target.value);
        setInputValue(formatted);
        const parsed = parseInputDate(formatted);
        if (parsed) {
            setSelectedDate(parsed);
            setViewDate(parsed.startOf("month"));
        }
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [pickerRef, isOpen]);

    useEffect(() => {
        if (value) {
            const dayValue = dayjs(value);
            setInputValue(dayValue.format("MM/DD/YYYY"));
            setViewDate(dayValue.startOf("month"));
            setSelectedDate(dayValue);
        }
    }, [value]);

    const datepickerHeader = () => (
        <>
            <FontAwesomeIcon
                className="custom-datepicker__header-icon"
                onClick={(e) => {
                    e.preventDefault();
                    toggleYear(false);
                }}
                icon="chevrons-left" />
            <FontAwesomeIcon
                className="custom-datepicker__header-icon"
                onClick={(e) => {
                    e.preventDefault();
                    toggleMonth(false);
                }}
                icon="chevron-left" />
            <h3>
                {viewDate.format('MMM YYYY')}
            </h3>
            <FontAwesomeIcon
                className="custom-datepicker__header-icon"
                onClick={(e) => {
                    e.preventDefault();
                    toggleMonth(true);
                }}
                icon="chevron-right" />
            <FontAwesomeIcon
                className="custom-datepicker__header-icon"
                onClick={(e) => {
                    e.preventDefault();
                    toggleYear(true);
                }}
                icon="chevrons-right" />
        </>
    );

    return (
        <div
            className="custom-datepicker"
            ref={pickerRef}>
            <label
                className="custom-datepicker__label"
                htmlFor={`${type}-input-field`}>
                {title}
                <div className={`custom-datepicker__input-container
                     ${error.active ? "input-error" : ""}`}>
                    <input
                        className="custom-datepicker__input-field"
                        id={`${type}-input-field`}
                        name={`${type}-input-field`}
                        type="text"
                        placeholder="mm/dd/yyyy"
                        aria-label={`${type}-input-field`}
                        value={inputValue}
                        min={min}
                        onChange={handleInputChange}
                        onBlur={handleInputChange}
                        onClick={() => setIsOpen(!isOpen)} />
                    <FontAwesomeIcon
                        icon="calendar"
                        className="custom-datepicker__icon" />
                </div>

                {isOpen && (
                    <div className="custom-datepicker__popup">
                        <div className="custom-datepicker__header" >
                            {datepickerHeader()}
                        </div>
                        <div className="custom-datepicker__grid">
                            {dayNames.map((name) => (
                                <div
                                    key={uniqueId()}
                                    className="custom-datepicker__day-name">
                                    {name}
                                </div>
                            ))}
                            {calendarDays.map(({ date, outside }) => {
                                const outsideClass = outside ? " outside" : "";
                                const selectedClass = date.isSame(selectedDate)
                                    ? " isSelected"
                                    : "";

                                return (
                                    <button
                                        key={uniqueId()}
                                        aria-label={`datepicker-date-${date.date()}`}
                                        className={`custom-datepicker__date
                                        ${outsideClass}
                                        ${selectedClass}`
                                        }
                                        onClick={() => selectDay(dayjs(date))} >
                                        {date.date()}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {error.active && (
                    <div className="date-error">
                        <ExclamationCircle alt="An error occurred" />
                        {error.message}
                    </div>
                )}
            </label>

        </div>
    );
});
CustomDatePicker.propTypes = propTypes;

export default CustomDatePicker;
