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
        'FY 2016',
        'FY 2015',
        'FY 2014',
        'FY 2013',
        'FY 2012',
        'FY 2011',
        'FY 2010',
        'FY 2009'
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
            state: 'loading',
            file: {
                startDate: null,
                endDate: null,
                error: {
                    show: false,
                    header: '',
                    description: ''
                }
            },
            errorDetails: ""
        };
    }

    handleDateChange(date, dateType) {
    // merge the new date into the file's state without affecting the other keys
        const newState = {
            [dateType]: moment(date)
        };
        this.setState({
            file: newState
        }, () => {
            this.validateDates();
        });
    }

    validateDates() {
        // validate that dates are provided for both fields and the end dates
        // don't come before the start dates

        const file = Object.assign({}, this.state.file);

        const output = {
            file: file
        };

        let isValid = true;

        // validate the date ranges
        const start = this.state.file.startDate;
        const end = this.state.file.endDate;
        if (start && end) {
            // both sets of dates exist
            if (!end.isSameOrAfter(start)) {
                // end date comes before start date, invalid
                isValid = false;
                // show an error message
                output.file.error = {
                    show: true,
                    header: 'Invalid Dates',
                    description: 'The end date cannot be earlier than the start date.'
                };
            }
            else {
                // valid!
                output.file.error = {
                    show: false,
                    header: '',
                    description: ''
                };
            }
        }
        else {
            // not all dates exist yet
            isValid = false;
            output.file.error = {
                show: false,
                header: '',
                description: ''
            };
        }

        this.setState(output);
    }

    showError(header, description) {
        this.setState({
            file: Object.assign(this.state.file, {
                error: {
                    show: true,
                    header: header,
                    description: description
                }
            })
        });
    }

    hideError() {
        this.setState({
            file: Object.assign(this.state.file, {
                error: {
                    show: false,
                    header: '',
                    description: ''
                }
            })
        });
    }


    render() {
        const fiscalYears = this.props.timePeriods.map((year, index) =>
            <FiscalYear name={year} key={index} />
        );

        return (
            <div className="timePeriodFilter">
                <b>Time Period</b>
                <div className="fiscalYears">{fiscalYears}</div>
                <DateRange
                    label={this.props.label}
                    datePlaceholder=""
                    startingTab={1}
                    onDateChange={this.handleDateChange.bind(this)}
                    showError={this.showError.bind(this)}
                    hideError={this.hideError.bind(this)} />
            </div>
        );
    }
}
TimePeriod.defaultProps = defaultProps;
TimePeriod.propTypes = propTypes;
