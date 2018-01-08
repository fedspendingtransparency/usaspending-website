/**
 * KeywordHeader.jsx
 * Created by Lizzie Salita 1/4/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    summary: PropTypes.object
};

export class KeywordHeader extends React.Component {
    constructor(props) {
        super(props);

        this.generateSummary = this.generateSummary.bind(this);
    }

    generateSummary() {
        const primeCount = this.props.summary.primeCount;
        const primeAmount = this.props.summary.primeAmount;

        const primeCountUnits = MoneyFormatter.calculateUnitForSingleValue(primeCount);
        const primeAmountUnits = MoneyFormatter.calculateUnitForSingleValue(primeAmount);

        // TODO - Lizzie: remove dollar sign from count & add decimal precision
        const formattedPrimeCount = `${MoneyFormatter.formatMoney(primeCount / primeCountUnits.unit)}\
            ${primeCountUnits.unitLabel}`;
        const formattedPrimeAmount = `${MoneyFormatter.formatMoney(primeAmount / primeAmountUnits.unit)}\
            ${primeAmountUnits.unitLabel}`;

        return (
            <div className="search-summary-section">
                <div className="summary-title">
                    Search Summary
                </div>
                <div className="award-amounts">
                    Total Prime Award Amount: {formattedPrimeAmount}
                </div>
                <div className="award-counts">
                    Prime Award Transaction Count: {formattedPrimeCount}
                </div>
            </div>
        );
    }

    render() {
        let searchSummary = null;
        if (this.props.summary) {
            searchSummary = this.generateSummary();
        }
        return (
            <div className="page-title-bar">
                <div className="page-title-bar-wrap">
                    <h1 className="page-title">
                        Keyword Award Search
                    </h1>
                    {searchSummary}
                </div>
            </div>
        );
    }
}


KeywordHeader.propTypes = propTypes;

export default KeywordHeader;
