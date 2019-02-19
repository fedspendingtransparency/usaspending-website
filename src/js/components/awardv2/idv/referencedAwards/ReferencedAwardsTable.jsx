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
        return referencedAwardsColumns[this.props.tableType].map((col) => (
            <th key={col.field}>
                {col.label}
            </th>
        ));
    }
    render() {
        // TODO - Lizzie: handle loading and error states
        return (
            <div className="referenced-awards-results">
                <Pagination
                    totalItems={this.props.totalItems}
                    pageSize={this.props.limit}
                    pageNumber={this.props.page}
                    onChangePage={this.props.changePage} />
                <table className="referenced-awards-table">
                    <thead className="referenced-awards-table__head">
                        <tr>
                            {this.generateHeaderCells()}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Results here
                            </td>
                        </tr>
                    </tbody>
                </table>
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
