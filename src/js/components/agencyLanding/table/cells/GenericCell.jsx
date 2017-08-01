/**
 * GenericCell.jsx
 * Created by Lizzie Salita 08/01/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.string,
    rowIndex: PropTypes.number,
    column: PropTypes.string
};

export default class ResultsTableGenericCell extends React.Component {
    render() {
        // calculate even-odd class names
        let rowClass = 'row-even';
        if (this.props.rowIndex % 2 === 0) {
            // row index is zero-based
            rowClass = 'row-odd';
        }

        return (
            <div className={`generic-cell column-${this.props.column} ${rowClass}`}>
                <div className="cell-content">
                    {this.props.data}
                </div>
            </div>
        );
    }
}

ResultsTableGenericCell.propTypes = propTypes;
