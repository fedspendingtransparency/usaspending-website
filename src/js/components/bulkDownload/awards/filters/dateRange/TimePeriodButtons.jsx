/**
 * TimePeriodButtons.jsx
 * Created by Lizzie Salita 11/6/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as fiscalYearHelper from 'helpers/fiscalYearHelper';
import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';

import FiscalYearButton from './buttons/FiscalYearButton';
import DateRangeButton from './buttons/DateRangeButton';

const propTypes = {
    currentStartDate: PropTypes.string,
    currentEndDate: PropTypes.string,
    handleDateChange: PropTypes.func
};

export default class TimePeriodButtons extends React.Component {
    constructor(props) {
        super(props);

        this.generateFYButtons = this.generateFYButtons.bind(this);
        this.generateDateRangeButtons = this.generateDateRangeButtons.bind(this);
    }

    generateFYButtons(col) {
        const currentFY = fiscalYearHelper.currentFiscalYear();
        const earliestFY = currentFY - 9;
        const fiscalYears = [];
        for (let year = currentFY; year >= earliestFY; year--) {
            fiscalYears.push(year);
        }
        let fyButtons = '';

        if (col === 1) {
            const column1Years = fiscalYears.splice(0, Math.floor(fiscalYears.length / 2));
            fyButtons = column1Years.map((year) => (
                <FiscalYearButton
                    key={year}
                    year={year}
                    currentStartDate={this.props.currentStartDate}
                    currentEndDate={this.props.currentEndDate}
                    handleDateChange={this.props.handleDateChange} />
            ));
        }
        else if (col === 2) {
            const column2Years = fiscalYears.splice(Math.floor(fiscalYears.length / 2), fiscalYears.length);
            fyButtons = column2Years.map((year) => (
                <FiscalYearButton
                    key={year}
                    year={year}
                    currentStartDate={this.props.currentStartDate}
                    currentEndDate={this.props.currentEndDate}
                    handleDateChange={this.props.handleDateChange} />
            ));
        }
        return fyButtons;
    }

    generateDateRangeButtons(col) {
        return awardDownloadOptions.dateRangeButtons[col].map((dateRange) => (
            <DateRangeButton
                key={dateRange.label}
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                active={(this.props.currentStartDate === dateRange.startDate)
                    && (this.props.currentEndDate === dateRange.endDate)}
                label={dateRange.label}
                handleDateChange={this.props.handleDateChange} />
        ));
    }

    render() {
        const column1 = this.generateFYButtons(1);
        const column2 = this.generateFYButtons(2);
        const column3 = this.generateDateRangeButtons('column3');
        const column4 = this.generateDateRangeButtons('column4');
        return (
            <div className="time-period-buttons">
                <div className="column">
                    {column1}
                </div>
                <div className="column">
                    {column2}
                </div>
                <div className="column">
                    {column3}
                </div>
                <div className="column">
                    {column4}
                </div>
            </div>
        );
    }
}

TimePeriodButtons.propTypes = propTypes;
