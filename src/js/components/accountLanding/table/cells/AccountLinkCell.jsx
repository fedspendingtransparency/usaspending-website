/**
 * AccountLinkCell.jsx
 * Created by Lizzie Salita 8/4/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import replaceString from 'helpers/replaceString';
import { Link } from 'react-router-dom';

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
            name = replaceString(this.props.name, this.props.accountSearchString, "results-table-cell__matched results-table-cell__matched_highlight");
        }

        return (
            <div className={`results-table-cell results-table-cell_column_${this.props.column}`}>
                <div className="results-table-cell__content">
                    <Link to={`/federal_account/${this.props.accountNumber}`}>
                        {name}
                    </Link>
                </div>
            </div>
        );
    }
}

AccountLinkCell.propTypes = propTypes;
