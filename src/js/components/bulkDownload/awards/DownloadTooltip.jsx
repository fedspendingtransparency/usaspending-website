/**
 * DownloadTooltip.jsx
 * Created by Lizzie Salita 3/26/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { InfoCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    filters: PropTypes.object,
    validDates: PropTypes.bool
};

export default class DownloadTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.generateRequiredFields = this.generateRequiredFields.bind(this);
    }

    generateRequiredFields() {
        const filters = this.props.filters;
        const requiredFields = [];
        if (!filters.awardLevels.primeAwards && !filters.awardLevels.subAwards) {
            requiredFields.push('Award Level');
        }
        if (!filters.awardTypes.contracts && !filters.awardTypes.grants && !filters.awardTypes.directPayments
            && !filters.awardTypes.loans && !filters.awardTypes.otherFinancialAssistance) {
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

    render() {
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
                                {this.generateRequiredFields()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DownloadTooltip.propTypes = propTypes;
