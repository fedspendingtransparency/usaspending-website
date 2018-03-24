/**
 * LoanAmounts.jsx
 * Created by Emily Gullo 02/13/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    faceValue: PropTypes.number,
    subsidy: PropTypes.number
};

export default class LoanAmounts extends React.Component {
    render() {
        let percentage = ((this.props.subsidy / this.props.faceValue) * 100).toFixed(2);
        if (this.props.subsidy === 0) {
            percentage = '0';
        }
        const hidePercentage = this.props.faceValue === 0 ? 'hide' : 'display';
        const adjustPercentagePos = this.props.faceValue === 0 ? '' : 'loan-amounts__group_has-decorator';

        return (
            <div className="loan-amounts">
                <div className="loan-amounts__group">
                    <div className="loan-amounts__title">Face Value of the Loan</div>
                    <div className="loan-amounts__value">
                        {MoneyFormatter.formatMoneyWithPrecision(this.props.faceValue, 0)}
                    </div>
                </div>
                <div className="loan-amounts__divider" />
                <div className={`loan-amounts__group loan-amounts__group_larger ${adjustPercentagePos}`}>
                    <div className="loan-amounts__title">Estimated Cost to the Government</div>
                    <div className="loan-amounts__value">
                        {MoneyFormatter.formatMoneyWithPrecision(this.props.subsidy, 0)}
                        <span className={`loan-amounts__value loan-amounts__value_${hidePercentage}`}>
                            &nbsp;
                            <span className="loan-amounts__value loan-amounts__value_italic">or</span>
                            &nbsp;{percentage}%
                        </span>
                        <p className={`loan-amounts__note loan-amounts__note_${hidePercentage}`}>
                            (of Face Value)
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
LoanAmounts.propTypes = propTypes;
