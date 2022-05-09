/**
 * DownloadTooltip.jsx
 * Created by Lizzie Salita 3/26/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { InfoCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    filters: PropTypes.object,
    validDates: PropTypes.bool,
    dataType: PropTypes.string
};

export default class DownloadTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.generateAwardsRequiredFields = this.generateAwardsRequiredFields.bind(this);
        this.generateAccountsRequiredFields = this.generateAccountsRequiredFields.bind(this);
    }

    generateAwardsRequiredFields() {
        const filters = this.props.filters;
        const requiredFields = [];
        if (!filters.awardTypes.primeAwards.size > 0 && !filters.awardTypes.subAwards.size > 0) {
            requiredFields.push('Award Type');
        }
        if (!this.props.validDates || !filters.dateType) {
            requiredFields.push('Date Range');
        }
        if (!filters.agency.id) {
            requiredFields.push('Agency');
        }
        if (!filters.location) {
            requiredFields.push('Recipient Location');
        }
        if (!filters.fileFormat) {
            requiredFields.push('File Format');
        }
        return requiredFields.map((field) => <li key={field}>{field}</li>);
    }

    generateAccountsRequiredFields() {
        const filters = this.props.filters;
        const requiredFields = [];
        if (!filters.agency.id && !filters.budgetFunction.code) {
            requiredFields.push('Budget Function or Agency');
        }
        if (!filters.submissionType) {
            requiredFields.push('File Type');
        }
        if (!filters.fy || !filters.quarter) {
            requiredFields.push('Time Period');
        }
        return requiredFields.map((field) => <li key={field}>{field}</li>);
    }

    render() {
        let missingFields = null;
        if (this.props.dataType === 'awards') {
            missingFields = this.generateAwardsRequiredFields();
        }
        else if (this.props.dataType === 'accounts') {
            missingFields = this.generateAccountsRequiredFields();
        }
        return (
            <div
                className="download-tooltip"
                id="download-disabled-tooltip"
                role="tooltip">
                <div className="download-tooltip__interior">
                    <div className="tooltip-pointer" />
                    <div className="download-tooltip__content">
                        <div className="download-tooltip__icon">
                            <InfoCircle />
                        </div>
                        <div className="download-tooltip__message">
                            The following fields are required:
                            <ul className="download-tooltip__list">
                                {missingFields}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DownloadTooltip.propTypes = propTypes;
