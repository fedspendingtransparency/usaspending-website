import React from 'react';
import PropTypes from 'prop-types';

import { formatMoneyWithPrecision } from '../../../../helpers/moneyFormatter';
import { Table } from "../../../sharedComponents/icons/Icons";

const propTypes = {
    totalTransactionObligatedAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    awardingAgencyCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    federalAccountCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    jumpToFederalAccountsHistory: PropTypes.func
};

const FederalAccountsSummary = ({
    totalTransactionObligatedAmount,
    awardingAgencyCount,
    federalAccountCount,
    jumpToFederalAccountsHistory
}) => (
    <div>
        <div className="federal-accounts-summary__section">
            <h4>Summary of Federal Accounts used by this IDV</h4>
            <div className="award-funding-summary__table">
                <div className="award-funding-summary__data">
                    <span>Total Funding Obligated</span>
                    <span>
                        {typeof totalTransactionObligatedAmount === "number"
                            ? formatMoneyWithPrecision(totalTransactionObligatedAmount, 2)
                            : totalTransactionObligatedAmount}
                    </span>
                </div>
                <div className="award-funding-summary__data">
                    <span>Total Count Of Funding Agencies</span>
                    <span>{awardingAgencyCount}</span>
                </div>
                <div className="award-funding-summary__data">
                    <span>Total Count of Federal Accounts</span>
                    <span>{federalAccountCount}</span>
                </div>
            </div>
        </div>
        <button onClick={jumpToFederalAccountsHistory} className="award-viz__button">
            <div className="award-viz__link-icon">
                <Table />
            </div>
            <div className="award-viz__link-text">View Federal Account Funding</div>
        </button>
    </div>
);

FederalAccountsSummary.propTypes = propTypes;

export default FederalAccountsSummary;
