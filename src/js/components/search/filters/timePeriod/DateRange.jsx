/**
 * DateRange.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import DatePicker from 'components/sharedComponents/DatePicker';

const defaultProps = {
    startDate: '01/01/2016',
    endDate: '12/31/2016',
    startingTab: 1
};

const propTypes = {
    startingTab: React.PropTypes.number,
    showError: React.PropTypes.func,
    onDateChange: React.PropTypes.func,
    hideError: React.PropTypes.func,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object
};

export default class DateRange extends React.Component {

    render() {
        return (
            <div className="dateRangeOption">
                <div className="date-range-wrapper">
                    <div className="date-range-wrapper">
                        <DatePicker
                            type="startDate" title="Start Date" tabIndex={this.props.startingTab}
                            onDateChange={this.props.onDateChange}
                            value={this.props.startDate}
                            opposite={this.props.endDate} showError={this.props.showError}
                            hideError={this.props.hideError} />
                        <div className="through-text">
                            through
                        </div>
                        <DatePicker
                            type="endDate" title="End Date" tabIndex={this.props.startingTab + 4}
                            onDateChange={this.props.onDateChange} value={this.props.endDate}
                            opposite={this.props.startDate} showError={this.props.showError}
                            hideError={this.props.hideError} />
                    </div>
                </div>
            </div>
        );
    }
}
DateRange.defaultProps = defaultProps;
DateRange.propTypes = propTypes;
