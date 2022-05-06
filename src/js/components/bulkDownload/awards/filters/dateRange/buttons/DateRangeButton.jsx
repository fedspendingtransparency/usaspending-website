/**
 * DateRangeButton.jsx
 * Created by Lizzie Salita 11/8/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    handleDateChange: PropTypes.func,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.bool
};

export default class DateRangeButton extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();

        this.props.handleDateChange(this.props.startDate, 'startDateBulk');
        this.props.handleDateChange(this.props.endDate, 'endDateBulk');
    }

    render() {
        const activeClass = this.props.active ? 'active' : '';
        return (
            <button
                className={`time-period-button ${activeClass}`}
                onClick={this.onClick}>
                {this.props.label}
            </button>
        );
    }
}

DateRangeButton.propTypes = propTypes;
