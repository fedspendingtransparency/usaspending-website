/**
 * ExplorerTable.jsx
 * Created by Lizzie Salita 10/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import Pagination from 'components/sharedComponents/Pagination';
import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';
import LegacyTableHeaderCell from 'components/account/awards/LegacyTableHeaderCell';
import TableRow from './TableRow';

const propTypes = {
    isLoading: PropTypes.bool,
    results: PropTypes.array,
    goDeeper: PropTypes.func,
    columns: PropTypes.array,
    onChangePage: PropTypes.func,
    pageNumber: PropTypes.number,
    totalItems: PropTypes.number,
    pageSize: PropTypes.number,
    order: PropTypes.object,
    updateSort: PropTypes.func,
    goToUnreported: PropTypes.func
};

export default class ExplorerTable extends React.Component {
    constructor(props) {
        super(props);

        this.selectedRow = this.selectedRow.bind(this);
    }

    selectedRow(id, title) {
        this.props.goDeeper(id, title);
    }

    render() {
        let noResultsClass = '';
        if (this.props.results.length === 0) {
            noResultsClass = ' no-results';
        }

        const rows = this.props.results.map((item, index) => (
            <TableRow
                item={item}
                key={`${uniqueId(item.name)}`}
                rowIndex={index}
                columns={this.props.columns}
                selectedRow={this.selectedRow}
                goToUnreported={this.props.goToUnreported} />
        ));

        const headers = this.props.columns.map((column, index) => (
            <td key={index}>
                <LegacyTableHeaderCell
                    isLast={index === this.props.columns.length - 1}
                    field={column.columnName}
                    title={column.displayName}
                    defaultDirection={column.defaultDirection}
                    currentSort={this.props.order}
                    updateSort={this.props.updateSort} />
            </td>
        ));

        let loadingMessage = null;
        if (this.props.isLoading) {
            loadingMessage = (
                <div className="explorer-detail-content__loading">
                    <div className="explorer-detail-content__loading-message">
                        <LoadingSpinner />
                        <div className="explorer-detail-content__loading-title">Gathering your data...</div>
                        <div className="explorer-detail-content__loading-subtitle">Updating Spending Explorer.</div>
                        <div>This should only take a few moments...</div>
                    </div>
                </div>
            );
        }

        return (
            <div className={`explorer-table${noResultsClass}`}>
                {loadingMessage}
                <Pagination
                    onChangePage={this.props.onChangePage}
                    pageNumber={this.props.pageNumber}
                    totalItems={this.props.totalItems}
                    pageSize={this.props.pageSize} />
                <table>
                    <thead>
                        <tr>
                            {headers}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <Pagination
                    onChangePage={this.props.onChangePage}
                    pageNumber={this.props.pageNumber}
                    totalItems={this.props.totalItems}
                    pageSize={this.props.pageSize} />
            </div>
        );
    }
}

ExplorerTable.propTypes = propTypes;
