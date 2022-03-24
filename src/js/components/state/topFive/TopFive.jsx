/**
 * TopFive.jsx
 * Created by Kevin Li 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { categoryTitles } from 'dataMapping/state/topCategories';

import TopFiveRow from './TopFiveRow';

const propTypes = {
    category: PropTypes.string,
    results: PropTypes.array,
    total: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.bool
};

const TopFive = (props) => {
    const rows = props.results.map((result, index) => (
        <TopFiveRow
            key={index}
            data={result}
            total={props.total} />
    ));

    const hideBody = props.loading || props.error ? `category-table__table-body_hide` : '';

    let message = null;
    if (props.error) {
        message = (
            <div className="category-table__message">
                An error occurred while loading this table.
            </div>
        );
    }
    else if (props.loading) {
        message = (
            <div className="category-table__message">
                Loading...
            </div>
        );
    }

    return (
        <div className="category-table">
            <div className="category-table__title">
                <img
                    className="category-table__title-icon"
                    src={`img/state-categories/${props.category}.png`}
                    alt="" />
                <div className="category-table__title-name">
                    {categoryTitles[props.category]}
                </div>
            </div>
            <table className="category-table__table">
                <thead
                    className="category-table__table-head">
                    <tr
                        className="category-table__table-head-row">
                        <th className="category-table__table-head-cell">
                            Name
                        </th>
                        <th className="category-table__table-head-cell category-table__table-head-cell_centered">
                            Awarded Amount
                        </th>
                        <th className="category-table__table-head-cell category-table__table-head-cell_centered">
                            % of Total
                        </th>
                    </tr>
                </thead>
                <tbody
                    className={`category-table__table-body ${hideBody}`}>
                    {rows}
                </tbody>
            </table>
            {message}
        </div>
    );
};

TopFive.propTypes = propTypes;

export default TopFive;
