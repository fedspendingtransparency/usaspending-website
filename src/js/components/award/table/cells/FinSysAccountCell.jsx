/**
 * FinSysAccountCell.jsx
 * Created by Kevin Li 3/7/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.object,
    rowIndex: PropTypes.number,
    column: PropTypes.string,
    isLastColumn: PropTypes.bool
};

export default class FinSysAccountCell extends React.Component {
    render() {
        // cell needs to have some content or it will collapse
        // replace with a &nbsp; if there's no data
        let content = (
            <a href={`#/federal_account/${this.props.data.id}`}>
                {this.props.data.title}
            </a>
        );
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
            <div className={`financial-system-generic-cell column-${this.props.column} ${rowClass}`} title={this.props.data.title}>
                <div className="cell-content">
                    {content}
                </div>
            </div>
        );
    }
}

FinSysAccountCell.propTypes = propTypes;
