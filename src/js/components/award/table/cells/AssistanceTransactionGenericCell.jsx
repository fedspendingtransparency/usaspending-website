/**
 * AssistanceTransactionGenericCell.jsx
 * Created by Lizzie Dabbs 03/07/17
 */

import React from 'react';

const propTypes = {
    data: React.PropTypes.string,
    rowIndex: React.PropTypes.number,
    column: React.PropTypes.string,
    isLastColumn: React.PropTypes.bool
};

export default class AssistanceTransactionGenericCell extends React.Component {
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
            <div className={`transaction-generic-cell column-${this.props.column} ${rowClass}`}>
                <div className="cell-content">
                    {content}
                </div>
            </div>
        );
    }
}

AssistanceTransactionGenericCell.propTypes = propTypes;
