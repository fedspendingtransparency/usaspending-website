/**
  * ResultsTableFormattedCell.jsx
  * Created by Kevin Li 12/1/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatMoney } from 'helpers/moneyFormatter';

const propTypes = {
    rowIndex: PropTypes.number,
    column: PropTypes.string,
    isLastColumn: PropTypes.bool,
    value: PropTypes.any,
    dataType: PropTypes.string
};

export default class ResultsTableFormattedCell extends React.Component {
    formatContent(original, type) {
        if (type === 'date') {
            // format the content as a date
            return moment(original, 'YYYY-MM-DD').format('M/D/YYYY');
        }
        else if (type === 'currency') {
            return formatMoney(original);
        }
        return original;
    }

    render() {
        // cell needs to have some content or it will collapse
        // replace with a &nbsp; if there's no data
        let content = this.props.value;
        if (!content) {
            content = "\u00A0";
        }
        else {
            content = this.formatContent(content, this.props.dataType);
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
            <div className={`award-result-generic-cell ${rowClass}`} title={content}>
                <div className="cell-content">
                    {content}
                </div>
            </div>
        );
    }
}

ResultsTableFormattedCell.propTypes = propTypes;
