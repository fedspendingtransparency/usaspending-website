/**
 * TopFiveRow.jsx
 * Created by Kwadwo Opoku-Debrah 07/10/18
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class TopFiveRow extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        category: PropTypes.string,
        total: PropTypes.number
    };

    buildResultsByCategory() {
        if (this.props.category === 'country' || this.props.category === 'state_territory') {
            return (
                <td
                    className="category-table__table-cell capitalize"
                    title={`${this.props.data.index}. ${this.props.data._name.toLowerCase()}`}>
                    {`${this.props.data.index}. ${this.props.data._name.toLowerCase()}`}
                </td>
            );
        }
        return (
            <td
                className="category-table__table-cell"
                title={this.props.data.name}>
                {this.props.data._slug ?
                    this.props.data.linkedName
                    : this.props.data.name}
            </td>
        );
    }
    render() {
        const percentValue = (this.props.data._amount / this.props.total) * 100;
        const percent = isNaN(percentValue) ? '--' : `${Math.round(percentValue * 100) / 100}%`;
        return (
            <tr
                className="category-table__table-row">
                {this.buildResultsByCategory()}
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
