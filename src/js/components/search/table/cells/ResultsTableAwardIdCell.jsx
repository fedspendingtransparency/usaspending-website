/**
  * ResultsTableAwardIdCell.jsx
  * Created by Emily Gullo 02/08/2017
  **/

import React from 'react';

const propTypes = {
    data: React.PropTypes.string,
    rowIndex: React.PropTypes.number,
    column: React.PropTypes.string,
    isLastColumn: React.PropTypes.bool,
    id: React.PropTypes.number
};

export default class ResultsTableAwardIdCell extends React.Component {
    render() {
        // cell needs to have some content or it will collapse
        // replace with a &nbsp; if there's no data
        let content = this.props.data;
        if (!content) {
            content = "\u00A0";
        }

        // calculate even-odd class names
        let rowClass = 'row-even';
        if (this.props.rowIndex % 2 === 0) {
            // row index is zero-based
            rowClass = 'row-odd';
        }

        if (this.props.isLastColumn) {
            rowClass += ' last-column';
        }

        return (
            <div className={`award-result-generic-cell column-${this.props.column} ${rowClass}`}>
                <div className="cell-content">
                    <a href={`/#/award/${this.props.id}`}>
                        {this.props.data}
                    </a>
                </div>
            </div>
        );
    }
}

ResultsTableAwardIdCell.propTypes = propTypes;
