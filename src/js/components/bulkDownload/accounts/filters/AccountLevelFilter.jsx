/**
 * AccountLevelFilter.jsx
 * Created by Lizzie Salita 4/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    accountLevels: PropTypes.array,
    currentAccountLevel: PropTypes.string,
    updateFilter: PropTypes.func,
    valid: PropTypes.bool
};

export default class AccountLevelFilter extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const target = e.target;
        this.props.updateFilter('accountLevel', target.value);
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

        const accountLevels = this.props.accountLevels.map((level) => (
            <div
                className="radio"
                key={level.name}>
                <input
                    type="radio"
                    aria-label={level.name}
                    value={level.name}
                    name="account-level"
                    checked={this.props.currentAccountLevel === level.name}
                    onChange={this.onChange} />
                <label
                    className="radio-label"
                    htmlFor="account-level">
                    {level.label} <span className="radio-label__subtext"> {level.description}</span>
                </label>
            </div>
        ));

        return (
            <div className="download-filter">
                <h3 className="download-filter__title">
                    {icon} Select the <span className="download-filter__title_em">account level</span> to include.
                </h3>
                <div className="download-filter__content">
                    {accountLevels}
                </div>
            </div>
        );
    }
}

AccountLevelFilter.propTypes = propTypes;
