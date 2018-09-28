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
    accountNumber: PropTypes.string,
    accountSearchString: PropTypes.string
};

export default class AccountLinkCell extends React.Component {
    render() {
        let name = this.props.name;
        // highlight the matched string if applicable
        if (this.props.accountSearchString) {
            name = reactStringReplace(this.props.name, this.props.accountSearchString, (match, i) => (
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
                    <a href={`/#/federal_account/${this.props.accountNumber}`}>
                        {name}
                    </a>
                </div>
            </div>
        );
    }
}

AccountLinkCell.propTypes = propTypes;
