import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from '../../sharedComponents/icons/Icons';

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
    <div className="award__col award-viz">
        <div className="award-viz__heading">
            <div className="award-viz__icon">
                <Pie />
            </div>
            <h3 className="award-viz__title">Federal Account Funding</h3>
        </div>
        <hr />
        <p>Funding Details Table goes here</p>
        <p>data: {`${totalTransactionObligatedAmount}, ${awardingAgencyCount}, ${federalAccountCount}`}</p>
    </div>
);

FundingSummary.propTypes = propTypes;

export default FundingSummary;
