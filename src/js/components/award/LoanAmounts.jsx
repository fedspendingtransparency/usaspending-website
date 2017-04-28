/**
 * LoanAmounts.jsx
 * Created by Emily Gullo 02/13/2017
 **/

import React from 'react';

import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    faceValue: React.PropTypes.string,
    subsidy: React.PropTypes.string
};

export default class LoanAmounts extends React.Component {

    render() {
        return (
            <div className="loan-amounts-wrapper">
                <div className="left">
                    <div className="title">Face Value of the Loan</div>
                    <div className="value">
                        {MoneyFormatter.formatMoneyWithPrecision(this.props.faceValue, 0)}
                    </div>
                </div>
                <div className="right">
                    <div className="title">Estimated Cost to the Government</div>
                    <div className="value">
                        {MoneyFormatter.formatMoneyWithPrecision(this.props.subsidy, 0)} <i>or</i>
                        &nbsp;{(this.props.subsidy / this.props.faceValue) * 100}%
                        <p className="note">(of Face Value)</p>
                    </div>
                </div>
            </div>
        );
    }
}
LoanAmounts.propTypes = propTypes;
