/**
 * ExplorerList.jsx
 * Created by Lizzie Salita 10/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { orderBy } from 'lodash';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import ExplorerTableFields from 'dataMapping/explorer/explorerTableFields';

import HeaderRow from './HeaderRow';
import TableRow from './TableRow';

const propTypes = {
    results: PropTypes.object,
    goDeeper: PropTypes.func,
    total: PropTypes.number
};

export default class ExplorerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortOrder: {
                field: 'obligated_amount',
                direction: 'desc'
            },
            page: 1,
            columns: [],
            results: []
        };

        this.setOrder = this.setOrder.bind(this);
        this.selectedRow = this.selectedRow.bind(this);
    }

    componentDidMount() {
        this.showColumns();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.results !== this.props.results) {
            this.parseResults(nextProps.results);
        }
    }

    setOrder(sortOrder) {
        this.setState({
            sortOrder
        }, () => {
            this.orderResults();
        });
    }

    parseResults(data) {
        const results = [];

        data.forEach((item) => {
            // Format obligated amount
            const formattedCurrency =
                MoneyFormatter.formatMoneyWithPrecision(item.amount, 0);

            const percentageValue = (item.amount / this.props.total);

            // Convert from decimal value to percentage and round to 2 decimal places
            const formattedPercentage = (percentageValue * 100).toFixed(2);

            let percent = `${formattedPercentage}%`;
            if (percent === '0.00%') {
                percent = 'Less than 0.01%';
            }

            const result = {
                name: item.name,
                id: item.id,
                obligated_amount: item.amount,
                percent_of_total: percentageValue,
                display: {
                    name: item.name,
                    obligated_amount: formattedCurrency,
                    percent_of_total: percent
                }
            };
            results.push(result);
        });

        this.setState({
            results
        });
    }

    showColumns() {
        const columns = [];
        const sortOrder = ExplorerTableFields.defaultSortDirection;

        ExplorerTableFields.order.forEach((col) => {
            const displayName = ExplorerTableFields[col];

            const column = {
                columnName: col,
                displayName,
                defaultDirection: sortOrder[col]
            };
            columns.push(column);
        });

        this.setState({
            columns
        }, () => {
            this.parseResults(this.props.results);
        });
    }

    orderResults() {
        // sort the results by the appropriate table column and direction
        const orderedResults = orderBy(this.state.results,
            [this.state.sortOrder.field], [this.state.sortOrder.direction]);

        this.setState({
            results: orderedResults
        });
    }

    selectedRow(id, title) {
        this.props.goDeeper(id, title);
    }

    render() {
        let noResultsClass = '';
        if (this.state.results.length === 0) {
            noResultsClass = ' no-results';
        }

        const rows = this.state.results.map((item, index) => (
            <TableRow
                item={item}
                key={item.id}
                rowIndex={index}
                columns={this.state.columns}
                selectedRow={this.selectedRow} />
        ));


        return (
            <div className="explorer-list">
                <div className={`explorer-table${noResultsClass}`}>
                    <table>
                        <thead>
                            <HeaderRow
                                columns={this.state.columns}
                                order={this.state.sortOrder}
                                setOrder={this.setOrder} />
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
