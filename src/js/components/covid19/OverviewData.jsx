/**
 * OverviewData.jsx
 * Created by Lizzie Salita 6/22/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import {
    formatMoney,
    formatMoneyWithPrecision,
    calculateUnitForSingleValue,
    unitValues,
    formatNumber,
    formatNumberWithPrecision
} from 'helpers/moneyFormatter';

const propTypes = {
    label: PropTypes.string.isRequired,
    amount: PropTypes.number,
    dollarAmount: PropTypes.bool,
    subtitle: PropTypes.string,
    isLoading: PropTypes.bool
};

const OverviewData = (props) => {
    // Generate formatted amount string
    let formattedAmount = props.dollarAmount ? formatMoney(props.amount) : formatNumber(props.amount);
    if (Math.abs(props.amount) > unitValues.MILLION) {
        const amount = calculateUnitForSingleValue(props.amount);
        formattedAmount = `${props.dollarAmount ? formatMoneyWithPrecision(props.amount / amount.unit, 1) : formatNumberWithPrecision(props.amount / amount.unit, 1)} ${capitalize(amount.longLabel)}`;
    }

    return (
        <div className="overview-data">
            <div className="overview-data__label">
                {props.label}
            </div>
            <div className="overview-data__subtitle">
                {props.subtitle}
            </div>
            <div className={`overview-data__amount${props.isLoading ? ' loading' : ''}`}>
                {props.isLoading && <div className="dot-pulse" />}
                {!props.isLoading && formattedAmount}
            </div>
        </div>
    );
};

OverviewData.propTypes = propTypes;
export default OverviewData;
