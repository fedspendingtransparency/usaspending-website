/**
 * ExplorerTableContainer.jsx
 * Created by Lizzie Salita 10/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { orderBy } from 'lodash';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as explorerActions from 'redux/actions/explorer/explorerActions';

import ExplorerTableFields from 'dataMapping/explorer/explorerTableFields';

import ExplorerTable from 'components/explorer/detail/visualization/table/ExplorerTable';

const propTypes = {
    order: PropTypes.object,
    results: PropTypes.object,
    goDeeper: PropTypes.func,
    total: PropTypes.number
};

export class ExplorerTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            results: []
        };
    }

    componentDidMount() {
        this.showColumns();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.results !== this.props.results) {
            this.parseResults(nextProps.results);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.order !== prevProps.order) {
            // table sort changed
            this.orderResults();
        }
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
            [this.props.order.field], [this.props.order.direction]);

        this.setState({
            results: orderedResults
        });
    }

    render() {
        return (
            <ExplorerTable
                results={this.state.results}
                columns={this.state.columns}
                order={this.props.order}
                total={this.props.total}
                goDeeper={this.props.goDeeper} />
        );
    }
}

ExplorerTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        order: state.explorer.table.order
    }),
    (dispatch) => bindActionCreators(explorerActions, dispatch)
)(ExplorerTableContainer);
