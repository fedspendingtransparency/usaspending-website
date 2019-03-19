import React from 'react';
import PropTypes from 'prop-types';

import { Pie } from '../../sharedComponents/icons/Icons';
import { formatMoneyWithPrecision } from '../../../helpers/moneyFormatter';

const propTypes = {
    totalTransactionObligatedAmount: PropTypes.number,
    awardingAgencyCount: PropTypes.number,
    federalAccountCount: PropTypes.number
};

const FundingSummary = ({
    totalTransactionObligatedAmount,
    awardingAgencyCount,
    federalAccountCount
}) => (
    // should be reusing styles for award-amounts and award-amounts__data
    <div className="award__col award-viz award-funding-summary">
        <div className="award-viz__heading">
            <div className="award-viz__icon">
                <Pie />
            </div>
            <h3 className="award-viz__title">Federal Account Funding</h3>
        </div>
        <hr />
        <div className="award-funding-summary__data">
            <span>Total Funding Obligated</span>
            <span>{formatMoneyWithPrecision(totalTransactionObligatedAmount, 2)}</span>
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
