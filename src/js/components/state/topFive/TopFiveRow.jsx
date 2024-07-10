/**
 * TopFiveRow.jsx
 * Created by Kevin Li 5/16/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.object,
    total: PropTypes.number,
    getSelectedLink: PropTypes.func
};

const TopFiveRow = (props) => {
    const percentValue = (props.data._amount / props.total) * 100;

    const percent = isNaN(percentValue) ? '--' : `${Math.round(percentValue * 100) / 100}%`;

    return (
        <tr
            className="category-table__table-row">
            <td
                className="category-table__table-cell"
                title={props.data.name}>
                {props.data._slug ?
                    props.data.linkedName
                    : props.data.name}
            </td>
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
            <td
                className="category-table__table-cell category-table__table-cell_centered"
                title="view in search">
                <a
                    role="button"
                    tabIndex={0}
                    aria-label="View Awards"
                    onKeyDown={(e) => { if (e.key === "Enter") props.getSelectedLink(e, props.data.name); }}
                    onClick={(e) => props.getSelectedLink(e, props.data.name)}>
                    View Awards
                </a>
            </td>
        </tr>
    );
};

TopFiveRow.propTypes = propTypes;

export default TopFiveRow;
