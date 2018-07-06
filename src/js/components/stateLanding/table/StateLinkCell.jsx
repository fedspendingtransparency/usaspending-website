/**
 * StateLinkCell.jsx
 * Created by Lizzie Salita 6/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';

const propTypes = {
    name: PropTypes.string,
    fips: PropTypes.string,
    searchString: PropTypes.string
};

export default class StateLinkCell extends React.Component {
    render() {
        let name = this.props.name;
        // highlight the matched string if applicable
        if (this.props.searchString !== '') {
            name = reactStringReplace(this.props.name, this.props.searchString, (match, i) => (
                <span
                    className="state-list__matched"
                    key={match + i}>
                    {match}
                </span>
            ));
        }

        return (
            <td className="state-list__body-cell">
                <a href={`#/state/${this.props.fips}`}>
                    {name}
                </a>
            </td>
        );
    }
}

StateLinkCell.propTypes = propTypes;
