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
        return (
            <div className={`generic-cell column-${this.props.column}`}>
                <div className="cell-content">
                    {this.props.data}
                </div>
            </div>
        );
    }
}

ResultsTableGenericCell.propTypes = propTypes;
