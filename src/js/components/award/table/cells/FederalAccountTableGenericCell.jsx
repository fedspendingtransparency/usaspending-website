/**
 * FederalAccountTableGenericCell.jsx
 * Created by Kwadwo Opoku-Debrah 04/04/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.string,
    rowIndex: PropTypes.number,
    column: PropTypes.string,
    link: PropTypes.string,
    isLastColumn: PropTypes.bool
};

export default class FederalAccountTableGenericCell extends React.Component {
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
            <div className={`transaction-generic-cell ${rowClass}`} title={content}>
                <div className="cell-content">
                    {
                        this.props.link ?
                            <a
                                target="_blank"
                                href={`${this.props.link}`}>
                                {this.props.data}
                            </a> : content
                    }
                </div>
            </div>
        );
    }
}

FederalAccountTableGenericCell.propTypes = propTypes;
