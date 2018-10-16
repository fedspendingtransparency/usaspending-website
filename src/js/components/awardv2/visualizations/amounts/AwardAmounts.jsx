/**
 * AwardAmounts.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { otherAmounts, loanAmounts, grantAmounts } from 'dataMapping/award/awardAmounts';
import { DollarSign } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    award: PropTypes.object
};

export default class AwardAmounts extends React.Component {
    generateRows() {
        let amounts = otherAmounts;
        if (this.props.award.category === 'grant') {
            amounts = grantAmounts;
        }
        else if (this.props.award.category === 'loan') {
            amounts = loanAmounts;
        }
        return amounts.map((data) => {
            const key = (
                <svg height="12" width="12" className="amounts-table__color">
                    <circle cy="6" cx="6" r="6" fill={data.color || "#ffffff"} />
                </svg>
            );
            const subtitle = data.subtitle ? (<span className="amounts-table__subtitle">({data.subtitle})</span>) : null;
            return (
                <tr
                    key={data.name}
                    className="amounts-table__row">
                    <td className="amounts-table__data amounts-table__data_title">{key} {data.display} {subtitle}</td>
                    <td className="amounts-table__data">{this.props.award[data.name]}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <DollarSign />
                    </div>
                    <h3 className="award-viz__title">
                        Amounts
                    </h3>
                </div>
                <hr />
                <div className="award-amounts__content">
                    <table className="amounts-table">
                        <tbody className="amounts-table__body">
                            {this.generateRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
AwardAmounts.propTypes = propTypes;
