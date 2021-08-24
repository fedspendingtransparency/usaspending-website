/**
  * FederalAccountsSummary.jsx
  * Created by Lizzie Salita 8/16/19
  **/

import React from 'react';
import PropTypes from 'prop-types';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import JumpToSectionButton from '../awardAmounts/JumpToSectionButton';

const propTypes = {
    summary: PropTypes.object,
    inFlight: PropTypes.bool,
    jumpToFederalAccountsHistory: PropTypes.func
};

const FederalAccountsSummary = ({ summary, inFlight, jumpToFederalAccountsHistory }) => {
    const generateTable = () => {
        let table;
        if (inFlight) {
            table = (
                <div className="results-table-message-container">
                    <ResultsTableLoadingMessage />
                </div>
            );
        }
        else {
            table = (
                <div className="award-funding-summary__table">
                    <div className="award-funding-summary__data">
                        <span>Total Funding Obligated</span>
                        <span>{summary.obligatedAmount}</span>
                    </div>
                    <div className="award-funding-summary__data">
                        <span>Total Count of Funding Agencies</span>
                        <span>{summary.fundingAgencyCount}</span>
                    </div>
                    <div className="award-funding-summary__data">
                        <span>Total Count of Awarding Agencies</span>
                        <span>{summary.awardingAgencyCount}</span>
                    </div>
                    <div className="award-funding-summary__data">
                        <span>Total Count of Federal Accounts</span>
                        <span>{summary.federalAccountCount}</span>
                    </div>
                </div>
            );
        }
        return table;
    };

    return (
        <div className="federal-accounts-summary__section">
            <h4>Summary of All Federal Accounts used by this Award</h4>
            {generateTable()}
            <JumpToSectionButton
                linkText="View federal funding submissions"
                icon="table"
                onClick={jumpToFederalAccountsHistory} />
        </div>
    );
};

FederalAccountsSummary.propTypes = propTypes;

export default FederalAccountsSummary;
