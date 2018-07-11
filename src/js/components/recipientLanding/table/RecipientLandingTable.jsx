/**
 * RecipientLandingTable.jsx
 * Created by David Trinh 7/3/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import StateLandingTableSorter from 'components/stateLanding/table/StateLandingTableSorter';
import RecipientLinkCell from './RecipientLinkCell';

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    total: PropTypes.number,
    results: PropTypes.array,
    setSort: PropTypes.func,
    sortField: PropTypes.string,
    order: PropTypes.object,
    searchString: PropTypes.string
};

const RecipientLandingTable = (props) => {
    const hideBody = props.loading || props.error || props.results.length === 0 ? 'recipient-list__body_hide' : '';

    const body = props.results.map((row) => (
        <tr
            key={row.id}
            className="recipient-list__body-row">
            <RecipientLinkCell
                id={row.id}
                type={row.recipientLevel}
                name={row.name}
                searchString={props.searchString} />
            <td className="recipient-list__body-cell recipient-list__body-cell_right">
                {row.duns}
            </td>
            <td className="recipient-list__body-cell recipient-list__body-cell_right">
                {row.amount}
            </td>
        </tr>
    ));

    let message = null;
    if (props.error) {
        message = (
            <div className="recipeint-list__message">
                An error occurred while loading this table.
            </div>
        );
    }
    else if (props.loading) {
        message = (
            <div className="recipient-list__message">
                Loading...
            </div>
        );
    }
    else if (props.results.length === 0) {
        // no results
        if (props.searchString) {
            message = (
                <div className="recipeint-list__message">
                    No results found for &ldquo;<span className="recipeint-list__message_highlight">{props.searchString}</span>&rdquo;.
                </div>
            );
        }
        else {
            message = (
                <div className="recipeint-list__message">
                    No results found.
                </div>
            );
        }
    }

    return (
        <div className="recipient-landing__results">
            <table
                className="recipient-list">
                <thead className="recipient-list__head">
                    <tr className="recipient-list__head-row">
                        <th className="recipient-list__head-cell">
                            <div className="header-cell">
                                <div className="header-cell__text">
                                    <div className="header-cell__title">
                                        Recipient Name
                                    </div>
                                </div>
                                <StateLandingTableSorter
                                    field="name"
                                    label="recipient"
                                    active={{ field: props.order.field, direction: props.order.direction }}
                                    setSort={props.setSort} />
                            </div>
                        </th>
                        <th className="recipient-list__head-cell">
                            <div className="header-cell header-cell_right">
                                <div className="header-cell__text">
                                    <div className="header-cell__title header-cell__title_right header-cell__title_cap">
                                        Duns
                                    </div>
                                </div>
                                <StateLandingTableSorter
                                    field="duns"
                                    label="duns"
                                    active={{ field: props.order.field, direction: props.order.direction }}
                                    setSort={props.setSort} />
                            </div>
                        </th>
                        <th className="recipient-list__head-cell">
                            <div className="header-cell  header-cell_right">
                                <div className="header-cell__text">
                                    <div className="header-cell__title header-cell__title_right">
                                        Awarded Amount
                                        <div className="header-cell__subtitle">
                                            (from trailing 12 months of Transactions)
                                        </div>
                                    </div>
                                </div>
                                <StateLandingTableSorter
                                    field="_amount"
                                    label="awarded amount"
                                    active={{ field: props.order.field, direction: props.order.direction }}
                                    setSort={props.setSort} />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className={`recipient-list__body ${hideBody}`}>
                    {body}
                </tbody>
            </table>
            {message}
        </div>
    );
};

RecipientLandingTable.propTypes = propTypes;

export default RecipientLandingTable;
