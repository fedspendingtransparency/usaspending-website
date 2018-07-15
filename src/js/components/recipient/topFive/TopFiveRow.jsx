/**
 * TopFiveRow.jsx
 * Created by Kwadwo Opoku-Debrah 07/10/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.object,
    total: PropTypes.number
};

export default class TopFiveRow extends React.Component {
    render() {
        const percentValue = (this.props.data._amount / this.props.total) * 100;

        const percent = isNaN(percentValue) ? '--' : `${Math.round(percentValue * 100) / 100}%`;
        return (
            <tr
                className="category-table__table-row">
                <td
                    className="category-table__table-cell"
                    title={this.props.data.name}>
                    {this.props.data.name}
                </td>
                <td
                    className="category-table__table-cell category-table__table-cell_centered"
                    title={this.props.data.amount}>
                    {this.props.data.amount}
                </td>
                <td
                    className="category-table__table-cell category-table__table-cell_centered"
                    title={percent}>
                    {percent}
                </td>
            </tr>
        );
    }
}

TopFiveRow.propTypes = propTypes;
