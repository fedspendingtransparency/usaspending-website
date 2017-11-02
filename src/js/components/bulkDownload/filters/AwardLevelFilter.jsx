/**
 * AwardLevelFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CheckCircle, ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

import DownloadCheckbox from './../DownloadCheckbox';

const propTypes = {
    awardLevels: PropTypes.array,
    currentAwardLevels: PropTypes.object,
    onChange: PropTypes.func,
    valid: PropTypes.bool
};

export default class AwardLevelFilter extends React.Component {
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
        const awardLevels = this.props.awardLevels.map((level) => (
            <DownloadCheckbox
                key={level.name}
                name={level.name}
                label={level.label}
                checked={this.props.currentAwardLevels[level.name]}
                onChange={this.props.onChange} />
        ));
        return (
            <div className="filter-section">
                <h5 className="filter-section-title">
                    {icon} Select the <span>award level</span> to include.
                </h5>
                <div className="filter-section-content">
                    {awardLevels}
                </div>
            </div>
        );
    }
}

AwardLevelFilter.propTypes = propTypes;
