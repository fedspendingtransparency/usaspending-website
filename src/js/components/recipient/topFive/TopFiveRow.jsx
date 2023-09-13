/**
 * TopFiveRow.jsx
 * Created by Kwadwo Opoku-Debrah 07/10/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.object,
    category: PropTypes.string,
    total: PropTypes.number
};
const TopFiveRow = (props) => {
    function buildResultsByCategory() {
        if (props.category === 'country' || props.category === 'state_territory') {
            return (
                <td
                    className="category-table__table-cell capitalize"
                    title={`${props.data.index}. ${props.data._name.toLowerCase()}`}>
                    {`${props.data.index}. ${props.data._name.toLowerCase()}`}
                </td>
            );
        }
        return (
            <td
                className="category-table__table-cell"
                title={props.data.name}>
                {props.data._slug ?
                    props.data.linkedName
                    : props.data.name}
            </td>
        );
    }

    const percentValue = (props.data._amount / props.total) * 100;
    const percent = isNaN(percentValue) ? '--' : `${Math.round(percentValue * 100) / 100}%`;

    return (
        <tr
            className="category-table__table-row">
            {buildResultsByCategory()}
            <td
                className="category-table__table-cell category-table__table-cell_centered"
                title={props.data.amount}>
                {props.data.amount}
            </td>
            <td
                className="category-table__table-cell category-table__table-cell_centered"
                title={percent}>
                {percent}
            </td>
        </tr>
    );
};

TopFiveRow.propTypes = propTypes;
export default TopFiveRow;
