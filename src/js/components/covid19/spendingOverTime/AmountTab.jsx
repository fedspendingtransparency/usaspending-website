/**
 * AmountTab.jsx
 * Created by Lizzie Salita 6/9/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import {
    formatMoney,
    formatMoneyWithPrecision,
    calculateUnitForSingleValue,
    unitValues
} from 'helpers/moneyFormatter';

const propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    active: PropTypes.bool,
    amount: PropTypes.number,
    disabled: PropTypes.bool
};


const AmountTab = (props) => {
    const setActiveTab = () => {
        props.setActiveTab(props.type);
    };

    // Generate formatted amount string
    let formattedAmount = formatMoney(props.amount);
    if (props.amount > unitValues.MILLION) {
        const amount = calculateUnitForSingleValue(props.amount);
        formattedAmount = `${formatMoneyWithPrecision(props.amount / amount.unit, 1)} ${capitalize(amount.longLabel)}`;
    }

    return (
        <button
            className={`count-tabs__button${props.active ? ' count-tabs__button_active' : ''}`}
            onClick={setActiveTab}
            disabled={props.disabled}>
            <div className="count-button">
                <div className="count-button__label">
                    {props.label}
                </div>
                <div className="count-button__count">
                    {(props.amount || props.amount === 0) ? formattedAmount : '--'}
                </div>
            </div>
        </button>
    );
};

AmountTab.propTypes = propTypes;
export default AmountTab;
