/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import Griddle from 'griddle-react';
import Immutable from 'immutable';

const propTypes = {
    results: React.PropTypes.array,
    batch: React.PropTypes.object,
    columns: React.PropTypes.array,
    columnMeta: React.PropTypes.array
};

export default class ResultsTable extends React.PureComponent {

    shouldComponentUpdate(nextProps) {
        // to reduce the frequency of re-renders, this component will only monitor for
        // batch triggers
        if (!Immutable.is(nextProps.batch, this.props.batch)) {
            return true;
        }
        return false;
    }

    render() {
        console.log("RENDER TABLE");
        return (
            <Griddle
                results={this.props.results}
                columns={this.props.columns}
                columnMetadata={this.props.columnMeta}
                resultsPerPage={15}
                useGriddleStyles={false} />
        );
    }
}

ResultsTable.propTypes = propTypes;
