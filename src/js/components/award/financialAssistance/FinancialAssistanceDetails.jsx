/**
 * FinancialAssistanceDetails.jsx
 * Created by Lizzie Dabbs 03/06/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import * as TimeRangeHelper from 'helpers/timeRangeHelper';
import * as SummaryPageHelper from 'helpers/summaryPageHelper';
import DetailRow from '../DetailRow';

const propTypes = {
    selectedAward: PropTypes.object
};

export default class FinancialAssistanceDetails extends React.Component {
    render() {
        const award = this.props.selectedAward;
        const timeRange = TimeRangeHelper.convertDatesToRange(award._startDate, award._endDate);
        let popDate = '--';
        if (award.startDate || award.endDate) {
            popDate = `${this.props.selectedAward.startDate} - ${this.props.selectedAward.endDate} ${timeRange}`;
        }
        const maxChars = SummaryPageHelper.maxDescriptionCharacters;
        return (
            <div className="contract-wrapper">
                <div className="contract-details">
                    <h3>Award Details</h3>
                    <hr
                        className="results-divider"
                        ref={(hr) => {
                            this.sectionHr = hr;
                        }} />
                    <table>
                        <tbody>
                            <DetailRow
                                title="Description"
                                value={award.description}
                                overflow={award.description.length > maxChars} />
                            <DetailRow
                                title="Period of Performance"
                                value={popDate} />
                            <DetailRow
                                title="Primary Place of Performance"
                                value={award.placeOfPerformance.fullAddress} />
                            <DetailRow
                                title={`${capitalize(award.category)} Type`}
                                value={award.typeDescription} />
                            <DetailRow
                                title="CFDA Program"
                                value={award.cfdaProgram} />
                            <DetailRow
                                title="CFDA Program Description"
                                value={award.cfdaProgramDescription}
                                overflow={award.cfdaProgramDescription.length > maxChars} />
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
FinancialAssistanceDetails.propTypes = propTypes;
