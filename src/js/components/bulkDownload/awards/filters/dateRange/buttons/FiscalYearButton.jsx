/**
 * FiscalYearButton.jsx
 * Created by Lizzie Salita 11/8/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as fiscalYearHelper from '../../../../../../helpers/fiscalYearHelper';

const propTypes = {
    handleDateChange: PropTypes.func,
    year: PropTypes.number,
    currentStartDate: PropTypes.string,
    currentEndDate: PropTypes.string
};

const FiscalYearButton = (props) => {
    let activeClass = '';
    const dates = fiscalYearHelper.convertFYToDateRange(props.year);
    if (props.currentStartDate === dates[0]
        && props.currentEndDate === dates[1]) {
        activeClass = 'active';
    }
    const label = `FY ${props.year}`;

    const onClick = (e) => {
        e.preventDefault();

        props.handleDateChange(dates[0], 'startDateBulk');
        props.handleDateChange(dates[1], 'endDateBulk');
    };

    return (
        <button
            className={`time-period-button ${activeClass}`}
            onClick={onClick}>
            {label}
        </button>
    );
};

FiscalYearButton.propTypes = propTypes;
