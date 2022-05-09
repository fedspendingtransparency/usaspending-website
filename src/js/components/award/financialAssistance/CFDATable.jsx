/**
* CFDATable.jsx
* Created by Jonathan Hill 03/17/20
**/

import React from 'react';
import PropTypes from 'prop-types';
import { map, uniqueId } from 'lodash';
import { Pagination } from 'data-transparency-ui';

import tableMapping from 'dataMapping/award/cfdaSectionTable';
import StateLandingTableSorter from 'components/stateLanding/table/StateLandingTableSorter';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import NoResultsMessage from 'components/sharedComponents/NoResultsMessage';

const propTypes = {
    page: PropTypes.number,
    limit: PropTypes.number,
    sort: PropTypes.string,
    order: PropTypes.string,
    total: PropTypes.number,
    currentPageCFDAs: PropTypes.array,
    changePage: PropTypes.func,
    onTableClick: PropTypes.func,
    updateSort: PropTypes.func,
    inFlight: PropTypes.bool,
    error: PropTypes.bool
};

export default class CFDATable extends React.Component {
    getHeaders() {
        const { sort, order, updateSort } = this.props;
        return map(tableMapping, (header) => (
            <th className="cfda-section-table__head-cell" key={header.displayName}>
                <div className="header-cell">
                    <div className="header-cell__text">
                        <div className="header-cell__title">
                            {header.displayName}
                        </div>
                    </div>
                    {header.field && <StateLandingTableSorter
                        field={header.field}
                        label={header.displayName}
                        active={{ field: sort, direction: order }}
                        setSort={updateSort} />}
                </div>
            </th>
        ));
    }

    getRows() {
        return this.props.currentPageCFDAs.map((cfda) => (
            <tr
                className="cfda-section-table__body-row"
                key={`row-${uniqueId()}`}>
                {map(tableMapping, (header, key) => {
                    let cellData = cfda[key];
                    if (key === 'cfdaTitleShort' && cfda.cfdaNumber) {
                        cellData = (
                            <button
                                className="award-viz__button"
                                value={cfda.cfdaNumber}
                                onClick={this.props.onTableClick}>
                                {`${cfda.cfdaNumber} - ${cfda[key]}`}
                            </button>
                        );
                    }
                    return (
                        <td
                            className={header.classname}
                            key={`${uniqueId()}`}>
                            {cellData}
                        </td>
                    );
                })}
            </tr>
        ));
    }

    renderTable() {
        if ((this.props.currentPageCFDAs.length > 0) && !this.props.error && !this.props.inFlight) {
            return (
                <div className="cfda-section-table-renderer">
                    <table className="cfda-section-table">
                        <thead className="cfda-section-table__head">
                            <tr className="cfda-section-table__head-row">
                                {this.getHeaders()}
                            </tr>
                        </thead>
                        <tbody>
                            {this.getRows()}
                        </tbody>
                    </table>
                </div>
            );
        }
        return null;
    }

    render() {
        const { inFlight, error, currentPageCFDAs } = this.props;
        let loadingMessage = null;
        let errorMessage = null;
        let noResultsMessage = null;
        let pagination = null;

        if (inFlight) {
            loadingMessage = (<ResultsTableLoadingMessage />);
        }
        if (error) {
            errorMessage = (<ResultsTableErrorMessage />);
        }
        if ((currentPageCFDAs.length === 0) && !error && !inFlight) {
            noResultsMessage = (<NoResultsMessage
                title="Chart Not Available"
                message="No available data to display." />);
        }
        if ((currentPageCFDAs.length > 0) && !error && !inFlight) {
            pagination = (
                <Pagination
                    resultsText
                    totalItems={this.props.total}
                    pageSize={this.props.limit}
                    currentPage={this.props.page}
                    changePage={this.props.changePage} />
            );
        }

        return (
            <div className="cfda-section-table-holder">
                <div className="results-table-message-container">
                    {loadingMessage}
                    {errorMessage}
                    {noResultsMessage}
                </div>
                {this.renderTable()}
                {pagination}
            </div>
        );
    }
}

CFDATable.propTypes = propTypes;
