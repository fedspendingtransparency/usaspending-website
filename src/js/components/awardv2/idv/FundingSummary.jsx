import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatMoneyWithPrecision } from '../../../helpers/moneyFormatter';

const propTypes = {
    totalTransactionObligatedAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    awardingAgencyCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    federalAccountCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

const FundingSummary = ({
    totalTransactionObligatedAmount,
    awardingAgencyCount,
    federalAccountCount
}) => (
    <div className="award__col award-viz award-funding-summary">
        <div className="award-viz__heading">
            <div className="award-viz__icon">
                <FontAwesomeIcon icon="chart-pie" />
            </div>
            <h3 className="award-viz__title">Federal Account Funding</h3>
        </div>
        <hr />
        <div className="award-funding-summary__data">
            <span>Total Funding Obligated</span>
            <span>{typeof totalTransactionObligatedAmount === "number"
                ? formatMoneyWithPrecision(totalTransactionObligatedAmount, 2)
                : totalTransactionObligatedAmount}
            </span>
        </div>
        <div className="award-funding-summary__data">
            <span>Total Count Of Awarding Agencies</span>
            <span>{awardingAgencyCount}</span>
        </div>
        <div className="award-funding-summary__data">
            <span>Total Count of Federal Accounts</span>
            <span>{federalAccountCount}</span>
        </div>
    </div>
);

FundingSummary.propTypes = propTypes;

export default FundingSummary;
