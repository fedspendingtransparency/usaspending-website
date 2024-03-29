/**
 * TopFive.jsx
 * Created by Kwadwo Opoku-Debrah 07/10/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { recipientCategoryTitles } from 'dataMapping/recipients/topCategories';

import TopFiveRow from './TopFiveRow';

const propTypes = {
    category: PropTypes.string,
    results: PropTypes.array,
    total: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.bool
};

const TopFive = (props) => {
    function validate() {
        let message = null;
        if (props.category === 'federal_account') {
            message = (
                <div className="category-table__message">
                    <span> Coming Soon </span>
                </div>
            );
        }
        else if (props.error) {
            message = (
                <div className="category-table__message">
                    <span> An error occurred while loading this table. </span>
                </div>
            );
        }
        else if (props.loading) {
            message = (
                <div className="category-table__message">
                    <span> Loading... </span>
                </div>
            );
        }
        else if (props.results.length === 0) {
            message = (
                <div className="category-table__message">
                    <span> No Data Available </span>
                </div>
            );
        }
        return message;
    }

    function deliverHTMLpayload() {
        let disclaimer;
        if (props.category === 'country' || props.category === 'state_territory') {
            disclaimer = (
                <span className="category-table__disclaimer"> <strong>Note: </strong> <em> This data is based on Primary Place of Performance.</em> </span>
            );
        }
        const rows = props.results.map((result, index) => (
            <TopFiveRow
                key={index}
                data={result}
                category={props.category}
                total={props.total} />
        ));
        const hideBody = props.loading || props.error ? `category-table__table-body_hide` : '';

        return (
            <div>
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
                {disclaimer}
            </div>);
    }

    return (
        <div className="category-table">
            <div>
                <div className="category-table__title">
                    <img
                        className="category-table__title-icon"
                        src={`img/state-categories/${props.category}.png`}
                        aria-hidden="true"
                        alt="" />
                    <div className="category-table__title-name">
                        {recipientCategoryTitles[props.category]}
                    </div>
                </div>
                {validate() ? <div className="category-message">{validate()}</div> : deliverHTMLpayload()}
            </div>
        </div>
    );
};

TopFive.propTypes = propTypes;
export default TopFive;
