/**
 * DateTypeFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CheckCircle, ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    dateTypes: PropTypes.array,
    currentDateType: PropTypes.string,
    onChange: PropTypes.func,
    valid: PropTypes.bool
};

export default class DateTypeFilter extends React.Component {
    render() {
        let icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );
        if (!this.props.valid) {
            icon = (
                <div className="icon invalid">
                    <ExclamationTriangle />
                </div>
            );
        }
        const dateTypes = this.props.dateTypes.map((dateType) => (
            <div
                className="radio"
                key={dateType.name}>
                <input
                    type="radio"
                    value={dateType.name}
                    name="dateType"
                    checked={this.props.currentDateType === dateType.name}
                    onChange={this.props.onChange} />
                <label className="radio-label" htmlFor="dateType">{dateType.label}</label>
                <div className="radio-description">
                    {dateType.description}
                </div>
            </div>
        ));
        return (
            <div className="filter-section">
                <h5 className="filter-section-title">
                    {icon} Select a <span>date type</span> for the date range below.
                </h5>
                <div className="filter-section-content">
                    {dateTypes}
                </div>
            </div>
        );
    }
}

DateTypeFilter.propTypes = propTypes;
