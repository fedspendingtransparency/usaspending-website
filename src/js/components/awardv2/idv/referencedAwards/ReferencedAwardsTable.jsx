/**
  * ReferencedAwardsTable.jsx
  * Created by Lizzie Salita 2/19/19
  **/

import React from 'react';
import PropTypes from 'prop-types';

import { referencedAwardsColumns } from 'dataMapping/awardsv2/referencedAwards';

import Pagination from 'components/sharedComponents/Pagination';

const propTypes = {
    tableType: PropTypes.string,
    results: PropTypes.array,
    totalItems: PropTypes.number,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    page: PropTypes.number,
    limit: PropTypes.number,
    sort: PropTypes.string,
    order: PropTypes.string,
    changePage: PropTypes.func
};

export default class ReferencedAwardsTable extends React.Component {
    generateHeaderCells() {
        // TODO - Lizzie: implement sorting
        return referencedAwardsColumns[this.props.tableType].map((col) => (
            <th key={col.field}>
                {col.label}
            </th>
        ));
    }
    generateRows() {
        return this.props.results.map((row) => {
            const columns = referencedAwardsColumns[this.props.tableType];
            return (
                <tr key={`row-${row.internalId}`}>
                    {columns.map((col) => {
                        let data = row[col.name];
                        if (col.name === 'piid') {
                            data = (<a href={`/#/award_v2/${row.internalId}`}>{row[col.name]}</a>);
                        }
                        // TODO - Lizzie: agency link
                        return (
                            <td key={data}>{data || '--'}</td>
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
            message = (<div>Loading...</div>);
            content = null;
        }
        else if (this.props.error) {
            message = (<div>An error occurred.</div>);
            content = null;
        }
        else if (this.props.results.length > 0) {
            message = null;
            content = (
                <table className="referenced-awards-table">
                    <thead className="referenced-awards-table__head">
                        <tr>
                            {this.generateHeaderCells()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateRows()}
                    </tbody>
                </table>
            );
        }

        return (
            <div className="referenced-awards-results">
                <Pagination
                    totalItems={this.props.totalItems}
                    pageSize={this.props.limit}
                    pageNumber={this.props.page}
                    onChangePage={this.props.changePage} />
                {content}
                {message}
                <Pagination
                    totalItems={this.props.totalItems}
                    pageSize={this.props.limit}
                    pageNumber={this.props.page}
                    onChangePage={this.props.changePage} />
            </div>
        );
    }
}

ReferencedAwardsTable.propTypes = propTypes;
