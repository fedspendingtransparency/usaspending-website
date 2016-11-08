/**
 * TimePeriod.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import moment from 'moment';
import DateRange from './DateRange';
import FiscalYear from './FiscalYear';

const defaultProps = {
    timePeriods: [
        '2016',
        '2015',
        '2014',
        '2013',
        '2012',
        '2011',
        '2010',
        '2009'
    ]
};

const propTypes = {
    timePeriods: React.PropTypes.array,
    label: React.PropTypes.string
};

export default class TimePeriod extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            error: {
                show: false,
                header: '',
                description: ''
            },
            errorDetails: ""
        };
    }

    handleDateChange(date, dateType) {
    // merge the new date into the file's state without affecting the other keys
        this.setState({
            [dateType]: moment(date)
        }, () => {
            this.validateDates();
        });
    }

    validateDates() {
        // validate that dates are provided for both fields and the end dates
        // don't come before the start dates

        const err = Object.assign({}, this.state);

        const output = {
            error: err
        };

        // validate the date ranges
        const start = this.state.startDate;
        const end = this.state.endDate;
        if (start && end) {
            // both sets of dates exist
            if (!end.isSameOrAfter(start)) {
                // end date comes before start date, invalid
                // show an error message
                output.error = {
                    show: true,
                    header: 'Invalid Dates',
                    description: 'The end date cannot be earlier than the start date.'
                };
            }
            else {
                // valid!
                output.error = {
                    show: false,
                    header: '',
                    description: ''
                };
            }
        }
        else {
            // not all dates exist yet
            output.error = {
                show: false,
                header: '',
                description: ''
            };
        }

        this.setState(output);
    }

    showError(head, desc) {
        this.setState({
            error: Object.assign(this.state.error, {
                show: true,
                header: head,
                description: desc
            })
        });
    }

    hideError() {
        this.setState({
            error: Object.assign(this.state.error, {
                show: false,
                header: '',
                description: ''
            })
        });
    }


    render() {
        const fiscalYears = this.props.timePeriods.map((year, index) =>
            <FiscalYear year={year} key={index} />
        );

        return (
            <div className="timePeriodFilter">
                <b>Time Period</b>
                <ul className="fiscalYears">{fiscalYears}</ul>
                <DateRange
                    label={this.props.label}
                    datePlaceholder=""
                    startingTab={1}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onDateChange={this.handleDateChange.bind(this)}
                    showError={this.showError.bind(this)}
                    hideError={this.hideError.bind(this)} />
            </div>
        );
    }
}
TimePeriod.defaultProps = defaultProps;
TimePeriod.propTypes = propTypes;
