/**
 * AgencyLinkCell.jsx
 * Created by Lizzie Salita 7/13/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.array,
    rowIndex: PropTypes.number,
    column: PropTypes.string,
    isLastColumn: PropTypes.bool,
    id: PropTypes.number
};

export default class AgencyLinkCell extends React.Component {
    render() {
        // cell needs to have some content or it will collapse
        // replace with a &nbsp; if there's no data
        let content = this.props.name;
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
            <div className={`award-result-generic-cell agency-link-cell column-${this.props.column} ${rowClass}`}>
                <div className="cell-content">
                    <a href={`/#/agency/${this.props.id}`}>
                        {this.props.name}
                    </a>
                </div>
            </div>
        );
    }
}

AgencyLinkCell.propTypes = propTypes;
