/**
 * DateRange.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import DatePicker from 'components/sharedComponents/DatePicker';
import DateRangeError from './DateRangeError';

const defaultProps = {
    startDate: '01/01/2016',
    endDate: '12/31/2016',
    startingTab: 1
};

const propTypes = {
    startingTab: React.PropTypes.number,
    onDateChange: React.PropTypes.func,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object
};

export default class DateRange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            header: '',
            errorMessage: ''
        };
    }

    showError(error, message) {
        this.setState({
            showError: true,
            header: error,
            errorMessage: message
        });
    }
    hideError() {
        this.setState({
            showError: false,
            header: '',
            errorMessage: ''
        });
    }

    render() {
        let errorDetails = null;
        if (this.state.showError) {
            errorDetails = (<DateRangeError
                header={this.state.header} message={this.state.errorMessage} />);
        }
        return (
            <div className="date-range-option">
                <div className="date-range-wrapper">
                    <DatePicker
                        type="startDate" title="Start Date" tabIndex={this.props.startingTab}
                        onDateChange={this.props.onDateChange}
                        value={this.props.startDate}
                        opposite={this.props.endDate} showError={this.showError.bind(this)}
                        hideError={this.hideError.bind(this)} />
                    <DatePicker
                        type="endDate" title="End Date" tabIndex={this.props.startingTab + 4}
                        onDateChange={this.props.onDateChange} value={this.props.endDate}
                        opposite={this.props.startDate} showError={this.showError.bind(this)}
                        hideError={this.hideError.bind(this)} />
                    { errorDetails }
                </div>
            </div>
        );
    }
}
DateRange.defaultProps = defaultProps;
DateRange.propTypes = propTypes;
