import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatMoneyWithPrecision } from '../../../helpers/moneyFormatter';
import { Table } from "../../sharedComponents/icons/Icons";
import ComingSoonSection from "./ComingSoonSection";

const propTypes = {
    totalTransactionObligatedAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    awardingAgencyCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    federalAccountCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    jumpToSection: PropTypes.func
};

const FundingSummary = ({
    totalTransactionObligatedAmount,
    awardingAgencyCount,
    federalAccountCount,
    jumpToSection
}) => {
    const jumpToAwardHistorySection = () => {
        jumpToSection('award-history');
    };
    return (
        <div className="award__col award-viz federal-accounts">
            <div className="award__col__content">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <FontAwesomeIcon size="lg" icon="chart-pie" />
                    </div>
                    <h3 className="award-viz__title">Federal Accounts</h3>
                </div>
                <hr />
                <ComingSoonSection className="federal-accounts__section" />
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
                        <span>Total Count Of Awarding Agencies</span>
                        <span>{awardingAgencyCount}</span>
                    </div>
                    <div className="award-funding-summary__data">
                        <span>Total Count of Federal Accounts</span>
                        <span>{federalAccountCount}</span>
                    </div>
                </div>
                <button onClick={jumpToAwardHistorySection} className="award-viz__button">
                    <div className="award-viz__link-icon">
                        <Table />
                    </div>
                    <div className="award-viz__link-text">View Federal Account Funding</div>
                </button>
            </div>
        </div>
    );
};

FundingSummary.propTypes = propTypes;

export default FundingSummary;
