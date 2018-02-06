/**
 * DownloadDateRange.jsx
 * Created by Lizzie Salita 11/1/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'components/sharedComponents/DatePicker';

const defaultProps = {
    startDate: '01/01/2016',
    endDate: '12/31/2016'
};

const propTypes = {
    onDateChange: PropTypes.func,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    showError: PropTypes.func,
    hideError: PropTypes.func,
    startingTab: PropTypes.number
};

export default class DownloadDateRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            header: '',
            errorMessage: ''
        };
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

    generateStartDateDisabledDays() {
        const disabledDays = [];

        if (this.props.endDate) {
            // Cutoff date represents the latest possible date
            // We only want users to be able to download 1 year's worth of data at a time,
            // So we set the start date a year before the end date
            // This requires adding a day after subtracting a year
            disabledDays.push({
                after: this.props.endDate.toDate(),
                before: moment(this.props.endDate).subtract(1, 'y').add(1, 'd').toDate()
            });
        }

        return disabledDays;
    }

    generateEndDateDisabledDays() {
        const disabledDays = [];

        if (this.props.startDate) {
            // Cutoff date represents the earliest possible date, based on the start date
            // We only want users to be able to download 1 year's worth of data at a time,
            // So we set the end date a year after the start date
            // This requires subtracting a day after adding a year
            disabledDays.push({
                before: this.props.startDate.toDate(),
                after: moment(this.props.startDate).add(1, 'y').subtract(1, 'd').toDate()
            });
        }

        return disabledDays;
    }

    render() {
        const startDateDisabledDays = this.generateStartDateDisabledDays();
        const endDateDisabledDays = this.generateEndDateDisabledDays();

        return (
            <div className="date-pickers">
                <DatePicker
                    type="startDateBulk"
                    title="Start Date"
                    tabIndex={this.props.startingTab}
                    onDateChange={this.props.onDateChange}
                    value={this.props.startDate}
                    opposite={this.props.endDate}
                    showError={this.props.showError}
                    hideError={this.props.hideError}
                    disabledDays={startDateDisabledDays}
                    ref={(component) => {
                        this.startPicker = component;
                    }}
                    allowClearing />
                <DatePicker
                    type="endDateBulk"
                    title="End Date"
                    tabIndex={this.props.startingTab + 4}
                    onDateChange={this.props.onDateChange}
                    value={this.props.endDate}
                    opposite={this.props.startDate}
                    showError={this.props.showError}
                    hideError={this.props.hideError}
                    disabledDays={endDateDisabledDays}
                    ref={(component) => {
                        this.endPicker = component;
                    }}
                    allowClearing />
            </div>
        );
    }
}

DownloadDateRange.defaultProps = defaultProps;
DownloadDateRange.propTypes = propTypes;
