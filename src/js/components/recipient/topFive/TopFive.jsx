/**
 * TopFive.jsx
 * Created by Kwadwo Opoku-Debrah 07/10/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { recipientCategoryTitles } from 'dataMapping/recipients/topCategories';
import { CircleArrowLeft } from 'components/sharedComponents/icons/Icons';

import TopFiveRow from './TopFiveRow';

const propTypes = {
    category: PropTypes.string,
    results: PropTypes.array,
    total: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.bool
};

export default class TopFive extends React.Component {
    constructor(props) {
        super(props);

        this.validate = this.validate.bind(this);
        this.deliverHTMLpayload = this.deliverHTMLpayload.bind(this);
    }

    validate() {
        let message = null;
        if (this.props.error) {
            message = (
                <div className="category-table__message">
                  An error occurred while loading this table.
                </div>
            );
        }
        else if (this.props.loading) {
            message = (
                <div className="category-table__message">
                  Loading...
                </div>
            );
        }
        return message;
    }

    deliverHTMLpayload() {
        const rows = this.props.results.map((result, index) => (
            <TopFiveRow
                key={index}
                data={result}
                total={this.props.total} />
        ));
        const hideBody = this.props.loading || this.props.error ? `category-table__table-body_hide` : '';

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
                <div className="category-table__link">
                    <a href="/#/search">
                        <CircleArrowLeft />
                        <span>Explore more in Advanced Search.</span>
                    </a>
                </div>
            </div>);
    }

    render() {
        return (
            <div className="category-table">
                <div className="category-table__title">
                    <img
                        className="category-table__title-icon"
                        src={`img/state-categories/${this.props.category}.png`}
                        alt={recipientCategoryTitles[this.props.category]} />
                    <div className="category-table__title-name">
                        {recipientCategoryTitles[this.props.category]}
                    </div>
                </div>
                {this.validate() ? this.validate() : this.deliverHTMLpayload()}
            </div>
        );
    }
}

TopFive.propTypes = propTypes;
