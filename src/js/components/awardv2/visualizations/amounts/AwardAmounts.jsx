/**
 * AwardAmounts.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { contractAmounts } from 'dataMapping/award/awardAmounts';
import { DollarSign, Table } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    award: PropTypes.object
};

export default class AwardAmounts extends React.Component {
    render() {
        const rows = contractAmounts.map((data) => {
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
                            {rows}
                        </tbody>
                    </table>
                    <a
                        href="/"
                        className="award-viz__link">
                        <div className="award-viz__link-icon">
                            <Table />
                        </div>
                        <div className="award-viz__link-text">
                            View transactions table
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}
AwardAmounts.propTypes = propTypes;
