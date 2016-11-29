/**
  * ResultsTableContainer.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import TableSearchFields from 'dataMapping/search/tableSearchFields';

import ResultsTable from 'components/search/table/ResultsTable';

import SearchActions from 'redux/actions/searchActions';

const propTypes = {
    rows: React.PropTypes.instanceOf(Immutable.Set),
    meta: React.PropTypes.instanceOf(Immutable.Record),
    batch: React.PropTypes.instanceOf(Immutable.Record)
};

const tableTypes = [
    {
        label: 'Contracts',
        internal: 'contracts'
    },
    {
        label: 'Grants',
        internal: 'grants'
    },
    {
        label: 'Direct Payments',
        internal: 'direct_payments'
    },
    {
        label: 'Loans',
        internal: 'loans'
    },
    {
        label: 'Insurance',
        internal: 'insurance'
    }
];

class ResultsTableContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            columnMeta: []
        };
    }

    componentWillMount() {
        this.setColumns(this.props.meta.tableType);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.meta.tableType !== this.props.meta.tableType) {
            // table type changed, update columns
            this.setColumns(nextProps.meta.tableType);
        }
    }
    shouldComponentUpdate(nextProps) {
        // to reduce the frequency of re-renders, this component will only monitor for
        // batch triggers
        if (!Immutable.is(nextProps.batch, this.props.batch)) {
            return true;
        }
        return false;
    }

    setColumns(tableType) {
         // calculate the column metadata to display in the table
        const columnMeta = [];
        const columns = [];

        const tableSettings = TableSearchFields[tableType];

        tableSettings._order.forEach((col) => {
            const column = {
                columnName: col,
                displayName: tableSettings[col]
            };
            columnMeta.push(column);
            columns.push(col);
        });

        this.setState({ columns, columnMeta }, () => {
            console.log("updated state");
        });
    }

    render() {
        console.log("CONTAINER RENDER");
        return (
            <ResultsTable
                results={this.props.rows.toArray()}
                columns={this.state.columns}
                columnMeta={this.state.columnMeta}
                tableTypes={tableTypes} />
        );
    }
}

ResultsTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        rows: state.records.awards,
        meta: state.resultsMeta,
        batch: state.resultsBatch
    }),
    (dispatch) => bindActionCreators(SearchActions, dispatch)
)(ResultsTableContainer);
