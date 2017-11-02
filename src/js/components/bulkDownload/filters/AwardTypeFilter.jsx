/**
 * AwardTypeFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CheckCircle, ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

import DownloadCheckbox from './../DownloadCheckbox';

const propTypes = {
    awardTypes: PropTypes.array,
    currentAwardTypes: PropTypes.object,
    onChange: PropTypes.func,
    valid: PropTypes.bool
};

export default class AwardTypeFilter extends React.Component {
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
        const awardTypes = this.props.awardTypes.map((type) => (
            <DownloadCheckbox
                key={type.name}
                name={type.name}
                label={type.label}
                checked={this.props.currentAwardTypes[type.name]}
                onChange={this.props.onChange} />
        ));
        return (
            <div className="filter-section">
                <h5 className="filter-section-title">
                    {icon} Select the <span>award types</span> to include.
                </h5>
                <div className="filter-section-content">
                    {awardTypes}
                </div>
            </div>
        );
    }
}

AwardTypeFilter.propTypes = propTypes;
