/**
 * ContractDetails.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as TimeRangeHelper from 'helpers/timeRangeHelper';
import * as SummaryPageHelper from 'helpers/summaryPageHelper';
import { idvAwardTypes } from 'dataMapping/contracts/idvAwardTypes';
import DetailRow from '../DetailRow';

const propTypes = {
    selectedAward: PropTypes.object,
    seeAdditional: PropTypes.func
};

export default class ContractDetails extends React.Component {
    render() {
        const award = this.props.selectedAward;
        let awardType = award.awardType;
        if (award.category === 'idv') {
            awardType = idvAwardTypes[this.props.selectedAward.awardType] || '--';
        }
        const timeRange = TimeRangeHelper.convertDatesToRange(award._startDate, award._endDate);
        const popDate = `${this.props.selectedAward.startDate} - ${this.props.selectedAward.endDate} (${timeRange})` || '--';

        const maxChars = SummaryPageHelper.maxDescriptionCharacters;
        return (
            <div className="contract-wrapper">
                <div className="contract-details">
                    <h3>Contract Details</h3>
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
                                overflow={award.description ? award.description.length > maxChars : false} />
                            <DetailRow
                                title="Period of Performance"
                                value={popDate} />
                            <DetailRow
                                title="Primary Place of Performance"
                                value={award.placeOfPerformance.fullAddress} />
                            <DetailRow
                                title="Contract Award Type"
                                value={awardType} />
                            <DetailRow
                                title="Contract Pricing Type"
                                value={award.pricing} />
                        </tbody>
                    </table>
                </div>
                <button
                    className="see-more"
                    onClick={this.props.seeAdditional}>
                    See Additional Details
                </button>
            </div>
        );
    }
}

ContractDetails.propTypes = propTypes;
