/**
  * ResultsTableGenericCell.jsx
  * Created by Kevin Li 12/1/16
  **/

import React from 'react';

const propTypes = {
    data: React.PropTypes.string,
    rowIndex: React.PropTypes.number,
    column: React.PropTypes.string
};

export default class ResultsTableGenericCell extends React.Component {
    render() {
        // cell needs to have some content or it will collapse
        // replace with a &nbsp; if there's no data
        let content = this.props.data;
        if (!content) {
            content = "\u00A0";
        }

        let rowClass = "row-even";
        if (this.props.rowIndex % 2 === 0) {
            // row index is zero-based
            rowClass = "row-odd";
        }

        return (
            <div className={`award-result-generic-cell column-${this.props.column} ${rowClass}`}>
                <div className="cell-content">
                    {content}
                </div>
            </div>
        );
    }
}

ResultsTableGenericCell.propTypes = propTypes;
