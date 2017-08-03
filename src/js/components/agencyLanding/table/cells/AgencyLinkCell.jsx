/**
 * AgencyLinkCell.jsx
 * Created by Lizzie Salita 7/13/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';

const propTypes = {
    name: PropTypes.string,
    rowIndex: PropTypes.number,
    column: PropTypes.string,
    id: PropTypes.number,
    agencySearchString: PropTypes.string
};

export default class AgencyLinkCell extends React.Component {
    render() {
        // calculate even-odd class names
        let rowClass = 'row-even';
        if (this.props.rowIndex % 2 === 0) {
            // row index is zero-based
            rowClass = 'row-odd';
        }

        let name = this.props.name;
        // highlight the matched string if applicable
        if (this.props.agencySearchString !== '') {
            name = reactStringReplace(this.props.name, this.props.agencySearchString, (match, i) => (
                <span key={match + i}>{match}</span>
            ));
        }

        return (
            <div className={`agency-link-cell column-${this.props.column} ${rowClass}`}>
                <div className="cell-content">
                    <a href={`/#/agency/${this.props.id}`}>
                        {name}
                    </a>
                </div>
            </div>
        );
    }
}

AgencyLinkCell.propTypes = propTypes;
