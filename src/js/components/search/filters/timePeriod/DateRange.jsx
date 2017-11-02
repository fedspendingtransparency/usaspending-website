/**
 * DateRange.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'components/sharedComponents/DatePicker';
import { AngleRight } from 'components/sharedComponents/icons/Icons';

const defaultProps = {
    startDate: '01/01/2016',
    endDate: '12/31/2016',
    startingTab: 1
};

const propTypes = {
    startingTab: PropTypes.number,
    onDateChange: PropTypes.func,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    showError: PropTypes.func,
    hideError: PropTypes.func,
    applyDateRange: PropTypes.func
};

export default class DateRange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            header: '',
            errorMessage: ''
        };

        this.submitRange = this.submitRange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.startDate !== this.props.startDate && !this.props.startDate) {
            // the start date was reset to null, clear the picker
            this.startPicker.clearValue();
        }
        if (prevProps.endDate !== this.props.endDate && !this.props.endDate) {
            // the end date was reset to null, clear the picker
            this.endPicker.clearValue();
        }
    }

    submitRange(e) {
        // allow the user to change date ranges by keyboard and pressing enter
        e.preventDefault();
        this.props.applyDateRange();
    }

    render() {
        return (
            <div className="date-range-option">
                <form
                    className="date-range-wrapper"
                    onSubmit={this.submitRange}>
                    <DatePicker
                        type="startDate"
                        title="Start Date"
                        tabIndex={this.props.startingTab}
                        onDateChange={this.props.onDateChange}
                        value={this.props.startDate}
                        opposite={this.props.endDate}
                        showError={this.props.showError}
                        hideError={this.props.hideError}
                        ref={(component) => {
                            this.startPicker = component;
                        }}
                        allowClearing />
                    <DatePicker
                        type="endDate"
                        title="End Date"
                        tabIndex={this.props.startingTab + 4}
                        onDateChange={this.props.onDateChange}
                        value={this.props.endDate}
                        opposite={this.props.startDate}
                        showError={this.props.showError}
                        hideError={this.props.hideError}
                        ref={(component) => {
                            this.endPicker = component;
                        }}
                        allowClearing />
                    <button
                        className="set-date-button"
                        title="Apply date range"
                        aria-label="Apply date range"
                        tabIndex={this.props.startingTab + 8}
                        onClick={this.props.applyDateRange}>
                        <AngleRight alt="Apply date range" />
                    </button>
                </form>
            </div>
        );
    }
}
DateRange.defaultProps = defaultProps;
DateRange.propTypes = propTypes;
