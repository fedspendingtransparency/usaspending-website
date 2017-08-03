/**
 * AgencyLinkCell.jsx
 * Created by Lizzie Salita 7/13/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    rowIndex: PropTypes.number,
    column: PropTypes.string,
    id: PropTypes.number
};

export default class AgencyLinkCell extends React.Component {
    render() {
        // calculate even-odd class names
        let rowClass = 'row-even';
        if (this.props.rowIndex % 2 === 0) {
            // row index is zero-based
            rowClass = 'row-odd';
        }

        return (
            <div className={`agency-link-cell column-${this.props.column} ${rowClass}`}>
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
