/**
 * FiscalYearButton.jsx
 * Created by Lizzie Salita 11/8/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as fiscalYearHelper from 'helpers/fiscalYearHelper';

const propTypes = {
    handleDateChange: PropTypes.func,
    year: PropTypes.number,
    currentStartDate: PropTypes.string,
    currentEndDate: PropTypes.string
};

export default class FiscalYearButton extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();

        const dates = fiscalYearHelper.convertFYToDateRange(this.props.year);
        this.props.handleDateChange(dates[0], 'startDateBulk');
        this.props.handleDateChange(dates[1], 'endDateBulk');
    }

    render() {
        let activeClass = '';
        const dates = fiscalYearHelper.convertFYToDateRange(this.props.year);
        if (this.props.currentStartDate === dates[0]
            && this.props.currentEndDate === dates[1]) {
            activeClass = 'active';
        }
        const label = `FY ${this.props.year}`;
        return (
            <button
                className={`time-period-button ${activeClass}`}
                onClick={this.onClick}>
                {label}
            </button>
        );
    }
}

FiscalYearButton.propTypes = propTypes;
