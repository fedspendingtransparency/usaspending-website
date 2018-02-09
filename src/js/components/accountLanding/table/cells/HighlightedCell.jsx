/**
 * HighlightedCell.jsx
 * Created by Lizzie Salita 08/10/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';

const propTypes = {
    data: PropTypes.string,
    rowIndex: PropTypes.number,
    column: PropTypes.string,
    searchString: PropTypes.string
};

export default class HighlightedCell extends React.Component {
    render() {
        let data = this.props.data;
        // highlight the matched string if applicable
        if (this.props.searchString) {
            data = reactStringReplace(this.props.data, this.props.searchString, (match, i) => (
                <span
                    className="results-table-cell__matched results-table-cell__matched_highlight"
                    key={match + i}>
                    {match}
                </span>
            ));
        }
        return (
            <div className={`results-table-cell results-table-cell_column_${this.props.column}`}>
                <div className="results-table-cell__content">
                    {data}
                </div>
            </div>
        );
    }
}

HighlightedCell.propTypes = propTypes;
