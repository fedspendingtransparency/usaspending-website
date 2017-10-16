/**
 * ExplorerTable.jsx
 * Created by Lizzie Salita 10/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import HeaderRow from './HeaderRow';
import TableRow from './TableRow';

const propTypes = {
    results: PropTypes.array,
    goDeeper: PropTypes.func,
    columns: PropTypes.array
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
            <div className="explorer-list">
                <div className={`explorer-table${noResultsClass}`}>
                    <table>
                        <thead>
                            <HeaderRow
                                columns={this.props.columns} />
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

ExplorerTable.propTypes = propTypes;
