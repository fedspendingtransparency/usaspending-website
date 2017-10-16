/**
 * ExplorerTable.jsx
 * Created by Lizzie Salita 10/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'components/sharedComponents/Pagination';
import HeaderRow from './HeaderRow';
import TableRow from './TableRow';

const propTypes = {
    results: PropTypes.array,
    goDeeper: PropTypes.func,
    columns: PropTypes.array,
    onChangePage: PropTypes.func,
    pager: PropTypes.object
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
                key={item.id}
                rowIndex={index}
                columns={this.props.columns}
                selectedRow={this.selectedRow} />
        ));


        return (
            <div className={`explorer-table${noResultsClass}`}>
                <Pagination
                    onChangePage={this.props.onChangePage}
                    pager={this.props.pager} />
                <table>
                    <thead>
                        <HeaderRow
                            columns={this.props.columns} />
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <Pagination
                    onChangePage={this.props.onChangePage}
                    pager={this.props.pager} />
            </div>
        );
    }
}

ExplorerTable.propTypes = propTypes;
