/**
  * ResultsTableGenericCell.jsx
  * Created by Kevin Li 12/1/16
  **/

import React from 'react';
import { Cell } from 'fixed-data-table';

const propTypes = {
    data: React.PropTypes.array,
    rowIndex: React.PropTypes.number,
    column: React.PropTypes.string
};

export default class ResultsTableGenericCell extends React.Component {
    render() {
        return (
            <Cell>
                <div className={`award-result-generic-cell column-${this.props.column}`}>
                    <div className="cell-content">
                        {this.props.data[this.props.rowIndex][this.props.column]}
                    </div>
                </div>
            </Cell>
        );
    }
}

ResultsTableGenericCell.propTypes = propTypes;
