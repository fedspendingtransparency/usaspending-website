/**
 * FinSysGenericCell.jsx
 * Created by Kevin Li 3/7/17
 */

import React from 'react';

const propTypes = {
    data: React.PropTypes.string,
    rowIndex: React.PropTypes.number,
    column: React.PropTypes.string,
    isLastColumn: React.PropTypes.bool
};

export default class FinSysGenericCell extends React.Component {
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
            <div className={`financial-system-generic-cell column-${this.props.column} ${rowClass}`}>
                <div className="cell-content">
                    {content}
                </div>
            </div>
        );
    }
}

FinSysGenericCell.propTypes = propTypes;
