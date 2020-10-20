/**
 * HighlightedCell.jsx
 * Created by Lizzie Salita 08/10/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import replaceString from 'helpers/replaceString';

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
            data = replaceString(this.props.data, this.props.searchString, "results-table-cell__matched results-table-cell__matched_highlight");
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
