import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FederalAccountsTable from './FederalAccountsTable';
import { formatMoneyWithPrecision } from '../../../../helpers/moneyFormatter';
import { Table } from "../../../sharedComponents/icons/Icons";

const propTypes = {
    totalTransactionObligatedAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    awardingAgencyCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    federalAccountCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    jumpToFederalAccountsHistory: PropTypes.func,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    page: PropTypes.number,
    limit: PropTypes.number,
    sort: PropTypes.string,
    order: PropTypes.string,
    total: PropTypes.number,
    federalAccounts: PropTypes.array,
    changePage: PropTypes.func,
    updateSort: PropTypes.func
};

const FederalAccountsSummary = ({
    totalTransactionObligatedAmount,
    awardingAgencyCount,
    federalAccountCount,
    jumpToFederalAccountsHistory,
    inFlight,
    error,
    page,
    limit,
    sort,
    order,
    total,
    federalAccounts,
    changePage,
    updateSort
}) => (
    <div className="award__col award-viz federal-accounts">
        <div className="award__col__content">
            <div className="award-viz__heading">
                <div className="award-viz__icon">
                    <FontAwesomeIcon size="lg" icon="chart-pie" />
                </div>
                <h3 className="award-viz__title">Federal Accounts</h3>
            </div>
            <hr />
            <div className="federal-accounts__section">
                <FederalAccountsTable
                    inFlight={inFlight}
                    error={error}
                    page={page}
                    limit={limit}
                    sort={sort}
                    order={order}
                    total={total}
                    federalAccounts={federalAccounts}
                    changePage={changePage}
                    updateSort={updateSort} />
            </div>
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
    </div>
);

FederalAccountsSummary.propTypes = propTypes;

export default FederalAccountsSummary;
