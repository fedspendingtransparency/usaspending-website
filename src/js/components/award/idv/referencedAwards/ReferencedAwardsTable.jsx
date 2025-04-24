/**
  * ReferencedAwardsTable.jsx
  * Created by Lizzie Salita 2/19/19
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'data-transparency-ui';
import { Link } from 'react-router-dom';

import { referencedAwardsColumns } from 'dataMapping/award/referencedAwards';

import StateLandingTableSorter from 'components/stateLanding/table/StateLandingTableSorter';
import ResultsTableNoResults from 'components/search/table/ResultsTableNoResults';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';

export default class ReferencedAwardsTable extends React.Component {
    static propTypes = {
        tableType: PropTypes.string,
        results: PropTypes.array,
        counts: PropTypes.object,
        inFlight: PropTypes.bool,
        error: PropTypes.bool,
        page: PropTypes.object,
        limit: PropTypes.number,
        sort: PropTypes.object,
        order: PropTypes.object,
        changePage: PropTypes.func,
        updateSort: PropTypes.func
    };

    generateHeaderCells() {
        const { tableType, sort, order } = this.props;
        return referencedAwardsColumns[this.props.tableType].map((col) => (
            <th
                className="referenced-awards-table__head-cell"
                key={col.field}>
                <div className={col.name === 'obligatedAmount' ? 'header-cell header-cell_right' : 'header-cell'}>
                    <div className="header-cell__text">
                        <div className="header-cell__title">
                            {col.label}
                        </div>
                    </div>
                    <StateLandingTableSorter
                        field={col.field}
                        label={col.label}
                        active={{ field: sort[tableType], direction: order[tableType] }}
                        setSort={this.props.updateSort} />
                </div>
            </th>
        ));
    }
    generateRows() {
        return this.props.results.map((row) => {
            const columns = referencedAwardsColumns[this.props.tableType];
            return (
                <tr
                    className="referenced-awards-table__body-row"
                    key={`row-${row.internalId}`}>
                    {columns.map((col) => {
                        let data = row[col.name];
                        if (col.name === 'piid') {
                            data = (<Link to={`/award/${row.internalId}`}>{row[col.name]}</Link>);
                        }
                        if (col.name === 'awardingAgency' && row.awardingAgencySlug) {
                            data = (<Link to={`/agency/${row.awardingAgencySlug}`}>{row[col.name]}</Link>);
                        }
                        return (
                            <td
                                className={`referenced-awards-table__body-cell ${col.name === 'obligatedAmount' ? 'recipient-list__body-cell_right' : ''}`}
                                key={`${row.internalId}-${col.name}`}>
                                {data || '--'}
                            </td>
                        );
                    })}
                </tr>
            );
        });
    }

    render() {
        let message = null;
        let content = null;

        if (this.props.inFlight) {
            message = (<ResultsTableLoadingMessage />);
            content = null;
        }
        else if (this.props.error) {
            message = (<ResultsTableErrorMessage />);
            content = null;
        }
        else if (this.props.results.length > 0) {
            message = null;
            content = (
                <table className="referenced-awards-table">
                    <thead className="referenced-awards-table__head">
                        <tr className="referenced-awards-table__head-row">
                            {this.generateHeaderCells()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateRows()}
                    </tbody>
                </table>
            );
        }
        else {
            message = (<ResultsTableNoResults />);
            content = null;
        }


        const totalItems = (this.props.counts && this.props.counts[this.props.tableType]) || 0;
        const { page, tableType } = this.props;
        return (
            <div className="referenced-awards-results">
                <Pagination
                    resultsText
                    totalItems={totalItems}
                    pageSize={this.props.limit}
                    currentPage={page[tableType]}
                    changePage={this.props.changePage} />
                {content}
                <div className="results-table-message-container">
                    {message}
                </div>
                <Pagination
                    resultsText
                    totalItems={totalItems}
                    pageSize={this.props.limit}
                    currentPage={page[tableType]}
                    changePage={this.props.changePage} />
            </div>
        );
    }
}
