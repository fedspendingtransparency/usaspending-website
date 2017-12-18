/**
 * LoanAmounts.jsx
 * Created by Emily Gullo 02/13/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    faceValue: PropTypes.string,
    subsidy: PropTypes.string
};

export default class LoanAmounts extends React.Component {
    render() {
        let percentage = ((this.props.subsidy / this.props.faceValue) * 100).toFixed(2);
        if (this.props.subsidy === 0) {
            percentage = "0";
        }
        return (
            <div className="loan-amounts-wrapper">
                <div className="left">
                    <div className="title">Face Value of the Loan</div>
                    <div className="value">
                        {MoneyFormatter.formatMoneyWithPrecision(this.props.faceValue, 0)}
                    </div>
                </div>
                <div className="divider" />
                <div className="right">
                    <div className="title">Estimated Cost to the Government</div>
                    <div className="value">
                        {MoneyFormatter.formatMoneyWithPrecision(this.props.subsidy, 0)} <i>or</i>
                        &nbsp;{percentage}%
                        <p className="note">(of Face Value)</p>
                    </div>
                </div>
            </div>
        );
    }
}
LoanAmounts.propTypes = propTypes;
