/**
 * StateLandingTable.jsx
 * Created by Kevin Li 5/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import StateLandingTableSorter from './StateLandingTableSorter';
import StateLinkCell from './StateLinkCell';

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    total: PropTypes.number,
    results: PropTypes.array,
    setSort: PropTypes.func,
    sortField: PropTypes.string,
    sortDirection: PropTypes.string,
    searchString: PropTypes.string
};

const StateLandingTable = (props) => {
    const hideBody = props.loading || props.error || props.results.length === 0 ? 'state-list__body_hide' : '';

    const body = props.results.map((row) => (
        <tr
            key={row.fips}
            className="state-list__body-row">
            <StateLinkCell
                fips={row.fips}
                name={row.name}
                searchString={props.searchString} />
            <td className="state-list__body-cell state-list__body-cell_right">
                {row.amount}
            </td>
            <td className="state-list__body-cell state-list__body-cell_right">
                {row.percentage(props.total)}
            </td>
        </tr>
    ));

    let message = null;
    if (props.error) {
        message = (
            <div className="state-list__message">
                An error occurred while loading this table.
            </div>
        );
    }
    else if (props.loading) {
        message = (
            <div className="state-list__message">
                Loading...
            </div>
        );
    }
    else if (props.results.length === 0) {
    // no results
        if (props.searchString) {
            message = (
                <div className="state-list__message">
                    No results found for &ldquo;<span className="state-list__message_highlight">{props.searchString}</span>&rdquo;.
                </div>
            );
        }
        else {
            message = (
                <div className="state-list__message">
                    No results found.
                </div>
            );
        }
    }

    return (
        <div className="state-landing__results">
            <table
                className="state-list">
                <thead className="state-list__head">
                    <tr className="state-list__head-row">
                        <th className="state-list__head-cell">
                            <div className="header-cell">
                                <div className="header-cell__text">
                                    <div className="header-cell__title">
                                        State or Territory Name
                                    </div>
                                </div>
                                <StateLandingTableSorter
                                    field="name"
                                    label="state"
                                    active={{ field: props.sortField, direction: props.sortDirection }}
                                    setSort={props.setSort} />
                            </div>
                        </th>
                        <th className="state-list__head-cell">
                            <div className="header-cell header-cell_right">
                                <div className="header-cell__text">
                                    <div className="header-cell__title header-cell__title_right">
                                        Awarded Amount
                                        <div className="header-cell__subtitle">
                                            from trailing 12 months
                                        </div>
                                    </div>
                                </div>
                                <StateLandingTableSorter
                                    field="_amount"
                                    label="awarded amount"
                                    active={{ field: props.sortField, direction: props.sortDirection }}
                                    setSort={props.setSort} />
                            </div>
                        </th>
                        <th className="state-list__head-cell">
                            <div className="header-cell  header-cell_right">
                                <div className="header-cell__text">
                                    <div className="header-cell__title header-cell__title_right">
                                        Percent of Total
                                        <div className="header-cell__subtitle">
                                            based on all state profiles
                                        </div>
                                    </div>
                                </div>
                                <StateLandingTableSorter
                                    field="_amount"
                                    label="percent of total"
                                    active={{ field: props.sortField, direction: props.sortDirection }}
                                    setSort={props.setSort} />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className={`state-list__body ${hideBody}`}>
                    {body}
                </tbody>
            </table>
            {message}
        </div>
    );
};

StateLandingTable.propTypes = propTypes;

export default StateLandingTable;
