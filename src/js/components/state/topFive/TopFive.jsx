/**
 * TopFive.jsx
 * Created by Kevin Li 5/15/18
 */

import React from 'react';
import { categoryTitles } from 'dataMapping/state/topCategories';

import TopFiveRow from './TopFiveRow';

const TopFive = (props) => {
    const rows = props.results.map((result) => (
        <TopFiveRow
            key={result.id}
            data={result}
            total={props.total} />
    ));
    return (
        <div className="category-table">
            <div className="category-table__title">
                <img
                    className="category-table__title-icon"
                    src={`img/state-categories/${props.category}.png`}
                    alt={categoryTitles[props.category]} />
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
                    className="category-table__table-body">
                    {rows}
                </tbody>
            </table>
        </div>
    );
};

export default TopFive;
