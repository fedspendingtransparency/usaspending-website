/**
  * ResultsTableLinkCell.jsx
  * Created by Emily Gullo 02/08/2017
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
    rowIndex: PropTypes.number,
    column: PropTypes.string,
    isLastColumn: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.string,
    onClick: PropTypes.func
};

const ResultsTableLinkCell = (props) => {
    // cell needs to have some content or it will collapse
    // replace with a &nbsp; if there's no data
    let content = props.value;
    if (!content) {
        content = "\u00A0";
    }

    // calculate even-odd class names
    let rowClass = 'row-even';
    if (props.rowIndex % 2 === 0) {
    // row index is zero-based
        rowClass = 'row-odd';
    }

    if (props.isLastColumn) {
        rowClass += ' last-column';
    }

    return (
        <div className={`award-result-generic-cell ${rowClass}`}>
            <div className="cell-content">
                <Link target="_blank" rel="noopener noreferrer" onClick={props.onClick} to={`/${props.column}/${props.id}`}>
                    {content}
                </Link>
            </div>
        </div>
    );
};

ResultsTableLinkCell.propTypes = propTypes;

export default ResultsTableLinkCell;
