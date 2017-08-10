/**
 * GenericAccountCell.jsx
 * Created by Lizzie Salita 08/10/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';

const propTypes = {
    data: PropTypes.string,
    rowIndex: PropTypes.number,
    column: PropTypes.string,
    accountSearchString: PropTypes.string
};

export default class GenericAccountCell extends React.Component {
    render() {
        let data = this.props.data;
        // highlight the matched string if applicable
        if (this.props.accountSearchString !== '') {
            data = reactStringReplace(this.props.data, this.props.accountSearchString, (match, i) => (
                <span key={match + i}>{match}</span>
            ));
        }
        return (
            <div className={`generic-account-cell column-${this.props.column}`}>
                <div className="cell-content">
                    {data}
                </div>
            </div>
        );
    }
}

GenericAccountCell.propTypes = propTypes;
