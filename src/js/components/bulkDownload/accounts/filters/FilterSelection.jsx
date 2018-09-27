/**
 * FilterSelection.jsx
 * Created by Kwadwo Opoku-Debrah  9/21/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    valid: PropTypes.bool
};

export default class FilterSelection extends React.Component {
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

        return (
            <div className="download-filter download-filter-notice">
                <h3 className="download-filter__title">
                    Select your Filter.
                </h3>
                <div className="download-filter__info">
                    {icon} <span>You may select one filter or both. </span>
                </div>
            </div>
        );
    }
}

FilterSelection.propTypes = propTypes;
