/**
 * AccountLinkCell.jsx
 * Created by Lizzie Salita 8/4/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';

const propTypes = {
    name: PropTypes.string,
    rowIndex: PropTypes.number,
    column: PropTypes.string,
    id: PropTypes.number,
    accountSearchString: PropTypes.string
};

export default class AccountLinkCell extends React.Component {
    render() {
        // calculate even-odd class names
        let rowClass = 'row-even';
        if (this.props.rowIndex % 2 === 0) {
            // row index is zero-based
            rowClass = 'row-odd';
        }

        let name = this.props.name;
        // highlight the matched string if applicable
        if (this.props.accountSearchString !== '') {
            name = reactStringReplace(this.props.name, this.props.accountSearchString, (match, i) => (
                <span key={match + i}>{match}</span>
            ));
        }

        return (
            <div className={`account-link-cell column-${this.props.column} ${rowClass}`}>
                <div className="cell-content">
                    <a href={`/#/account/${this.props.id}`}>
                        {name}
                    </a>
                </div>
            </div>
        );
    }
}

AccountLinkCell.propTypes = propTypes;
