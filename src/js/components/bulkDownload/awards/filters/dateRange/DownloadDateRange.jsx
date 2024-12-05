/**
 * DownloadDateRange.jsx
 * Created by Lizzie Salita 11/1/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
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

    render() {
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
                    ref={(component) => {
                        this.startPicker = component;
                    }} />
                <DatePicker
                    type="endDateBulk"
                    title="End Date"
                    tabIndex={this.props.startingTab + 4}
                    onDateChange={this.props.onDateChange}
                    value={this.props.endDate}
                    opposite={this.props.startDate}
                    showError={this.props.showError}
                    hideError={this.props.hideError}
                    ref={(component) => {
                        this.endPicker = component;
                    }} />
            </div>
        );
    }
}

DownloadDateRange.defaultProps = defaultProps;
DownloadDateRange.propTypes = propTypes;
