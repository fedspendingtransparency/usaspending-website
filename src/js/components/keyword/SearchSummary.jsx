import React from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';

const SearchSummary = ({
    primeAwardTotal,
    primeTransactionCount,
    inFlight
}) => {
    let formattedPrimeCount = (<span>&nbsp;&mdash;&nbsp;</span>);
    let formattedPrimeAmount = (<span>&nbsp;&mdash;&nbsp;</span>);
    if (!inFlight) {
        const primeCount = primeTransactionCount;
        const primeAmount = primeAwardTotal;

        const primeCountUnits = MoneyFormatter.calculateUnitForSingleValue(primeCount);
        const primeAmountUnits = MoneyFormatter.calculateUnitForSingleValue(primeAmount);

        if (primeCountUnits.unit >= MoneyFormatter.unitValues.MILLION) {
            // Abbreviate numbers greater than or equal to 1M
            formattedPrimeCount =
                `${MoneyFormatter.formatNumberWithPrecision(primeCount / primeCountUnits.unit, 1)}${primeCountUnits.unitLabel}`;
        }
        else {
            formattedPrimeCount =
                `${MoneyFormatter.formatNumberWithPrecision(primeCount, 0)}`;
        }

        if (primeAmountUnits.unit >= MoneyFormatter.unitValues.MILLION) {
            // Abbreviate amounts greater than or equal to $1M
            formattedPrimeAmount =
                `${MoneyFormatter.formatMoneyWithPrecision(primeAmount / primeAmountUnits.unit, 1)}${primeAmountUnits.unitLabel}`;
        }
        else {
            formattedPrimeAmount =
                `${MoneyFormatter.formatMoneyWithPrecision(primeAmount, 0)}`;
        }
    }

    return (
        <div className="keyword-header__summary">
            <p className="keyword-header__summary-title">
                Search Summary
            </p>
            <p className="keyword-header__summary-amount">
                Total Prime Award Amount: <span className="keyword-header__summary-amount keyword-header__summary-amount_bold">{formattedPrimeAmount}</span>
            </p>
            <p className="keyword-header__summary-amount">
                Prime Award Transaction Count: <span className="keyword-header__summary-amount keyword-header__summary-amount_bold">{formattedPrimeCount}</span>
            </p>
        </div>
    );
};

SearchSummary.propTypes = {
    primeAwardTotal: PropTypes.number,
    primeTransactionCount: PropTypes.number,
    inFlight: PropTypes.bool
};

export default SearchSummary;
