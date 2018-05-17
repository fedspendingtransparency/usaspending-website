/**
 * TopFiveRow.jsx
 * Created by Kevin Li 5/16/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const TopFiveRow = (props) => {
    const percentValue = (props.data._amount / props.total) * 100;

    const percent = isNaN(percentValue) ? '--' : `${Math.round(percentValue * 100) / 100}%`;

    return (
        <tr
            className="category-table__table-row">
            <td
                className="category-table__table-cell">
                {props.data.name}
            </td>
            <td
                className="category-table__table-cell category-table__table-cell_centered">
                {props.data.amount}
            </td>
            <td
                className="category-table__table-cell category-table__table-cell_centered">
                {percent}
            </td>
        </tr>
    );
};

export default TopFiveRow;
