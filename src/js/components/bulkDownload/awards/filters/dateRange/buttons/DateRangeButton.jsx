/**
 * DateRangeButton.jsx
 * Created by Lizzie Salita 11/8/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    handleDateChange: PropTypes.func,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.bool
};

const DateRangeButton = (props) => {
    const activeClass = props.active ? 'active' : '';

    const onClick = (e) => {
        e.preventDefault();

        props.handleDateChange(props.startDate, 'startDateBulk');
        props.handleDateChange(props.endDate, 'endDateBulk');
    };

    return (
        <button
            className={`time-period-button ${activeClass}`}
            onClick={onClick}>
            {props.label}
        </button>
    );
};

DateRangeButton.propTypes = propTypes;
