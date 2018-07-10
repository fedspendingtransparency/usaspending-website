/**
 * RecipientLinkCell.jsx
 * Created by David Trinh 7/3/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    searchString: PropTypes.string
};

export default class RecipientLinkCell extends React.Component {
    render() {
        return (
            <td className="recipient-list__body-cell">
                <a href={`#/recipient/${this.props.id}`}>
                    {this.props.name}
                </a>
            </td>
        );
    }
}

RecipientLinkCell.propTypes = propTypes;
