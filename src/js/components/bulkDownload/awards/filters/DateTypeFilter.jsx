/**
 * DateTypeFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    dateTypes: PropTypes.array,
    currentDateType: PropTypes.string,
    updateFilter: PropTypes.func,
    valid: PropTypes.bool
};

export default class DateTypeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const target = e.target;
        this.props.updateFilter('dateType', target.value);
    }

    render() {
        let icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );
        if (!this.props.valid) {
            icon = (
                <div className="icon invalid">
                    <ExclamationCircle />
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
                    onChange={this.onChange} />
                <label className="radio-label" htmlFor="dateType">{dateType.label}</label>
                <div className="radio-description">
                    {dateType.description}
                </div>
            </div>
        ));
        return (
            <div className="download-filter">
                <div className="download-filter__title">
                    {icon} Select a <span className="download-filter__title_em">date type</span> for the date range below.
                </div>
                <div className="download-filter__content">
                    {dateTypes}
                </div>
            </div>
        );
    }
}

DateTypeFilter.propTypes = propTypes;
