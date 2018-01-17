/**
 * KeywordHeader.jsx
 * Created by Lizzie Salita 1/4/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    summary: PropTypes.object,
    inFlight: PropTypes.bool
};

export class KeywordHeader extends React.Component {
    constructor(props) {
        super(props);

        this.generateSummary = this.generateSummary.bind(this);
    }

    generateSummary() {
        let formattedPrimeCount = (<span>&nbsp;&mdash;&nbsp;</span>);
        let formattedPrimeAmount = (<span>&nbsp;&mdash;&nbsp;</span>);
        if (!this.props.inFlight) {
            const primeCount = this.props.summary.primeCount;
            const primeAmount = this.props.summary.primeAmount;

            const primeCountUnits = MoneyFormatter.calculateUnitForSingleValue(primeCount);
            const primeAmountUnits = MoneyFormatter.calculateUnitForSingleValue(primeAmount);

            let primeCountPrecision = 0;
            if (primeCountUnits.unit !== 1) {
                primeCountPrecision = 1;
            }
            formattedPrimeCount =
                `${MoneyFormatter.formatNumberWithPrecision(primeCount / primeCountUnits.unit, primeCountPrecision)}${primeCountUnits.unitLabel}`;

            let primeAmountPrecision = 2;
            if (primeAmountUnits.unit !== 1) {
                primeAmountPrecision = 1;
            }
            formattedPrimeAmount =
                `${MoneyFormatter.formatMoneyWithPrecision(primeAmount / primeAmountUnits.unit, primeAmountPrecision)}${primeAmountUnits.unitLabel}`;
        }

        return (
            <div className="search-summary">
                <div className="summary-title">
                    Search Summary
                </div>
                <div className="award-amounts">
                    <div className="prime">
                        Total Prime Award Amount: <span className="number">{formattedPrimeAmount}</span>
                    </div>
                </div>
                <div className="award-counts">
                    <div className="prime">
                        Prime Award Transaction Count: <span className="number">{formattedPrimeCount}</span>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let searchSummary = null;
        if (this.props.summary || this.props.inFlight) {
            searchSummary = this.generateSummary();
        }
        return (
            <div className="search-header-wrapper">
                <div className="search-header-container">
                    <div className="search-header">
                        <div className="search-title">
                            <h1>Keyword Search</h1>
                        </div>
                        {searchSummary}
                        <div className="search-options">
                            <div className="download-wrap">
                                <button
                                    className="download-button disabled"
                                    title="Download your data"
                                    aria-label="Download your data">
                                    <div className="label">
                                        Download
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


KeywordHeader.propTypes = propTypes;

export default KeywordHeader;
