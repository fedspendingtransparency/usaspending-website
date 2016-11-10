/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import Griddle from 'griddle-react';

const propTypes = {
    results: React.PropTypes.object
};

const columns = [
    'id',
    'recipient',
    'period_of_performance_start_date',
    'period_of_performance_current_end_date',
    'total_obligation'
];

const columnMetadata = [
    {
        columnName: 'id',
        order: 1,
        displayName: 'ID'
    },
    {
        columnName: 'recipient',
        order: 2,
        displayName: 'Recipient'
    },
    {
        columnName: 'period_of_performance_start_date',
        order: 3,
        displayName: 'Start Date'
    },
    {
        columnName: 'period_of_performance_current_end_date',
        order: 4,
        displayName: 'End Date'
    },
    {
        columnName: 'total_obligation',
        order: 5,
        displayName: 'Total Obligated'
    }
];

export default class ResultsTable extends React.Component {
    render() {
        return (
            <Griddle
                results={this.props.results.rows}
                columns={columns}
                columnMetadata={columnMetadata}
                resultsPerPage={30} />
        );
    }
}

ResultsTable.propTypes = propTypes;
