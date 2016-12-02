/**
  * ResultsTableContainer.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import TableSearchFields from 'dataMapping/search/tableSearchFields';

import ResultsTableContent from 'components/search/table/ResultsTableContent';

import SearchActions from 'redux/actions/searchActions';

const propTypes = {
    rows: React.PropTypes.instanceOf(Immutable.Set),
    meta: React.PropTypes.instanceOf(Immutable.Record),
    batch: React.PropTypes.instanceOf(Immutable.Record),
    setSearchTableType: React.PropTypes.func
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

class ResultsTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: []
        };

        this.switchTab = this.switchTab.bind(this);
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

    setColumns(tableType) {
         // calculate the column metadata to display in the table
        const columns = [];

        const tableSettings = TableSearchFields[tableType];

        tableSettings._order.forEach((col) => {
            const column = {
                columnName: col,
                displayName: tableSettings[col],
                width: TableSearchFields.columnWidths[col]
            };
            columns.push(column);
        });

        this.setState({ columns });
    }

    switchTab(tab) {
        this.props.setSearchTableType(tab);
    }

    render() {
        console.log("CONTAINER RENDER");
        return (
            <ResultsTableContent
                batch={this.props.batch}
                inFlight={this.props.meta.inFlight}
                results={this.props.rows.toArray()}
                resultsMeta={this.props.meta.toJS()}
                columns={this.state.columns}
                tableTypes={tableTypes}
                currentType={this.props.meta.tableType}
                switchTab={this.switchTab} />
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
