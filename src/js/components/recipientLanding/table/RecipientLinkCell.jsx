/**
 * RecipientLinkCell.jsx
 * Created by David Trinh 7/3/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    searchString: PropTypes.string
};

export default class RecipientLinkCell extends React.Component {
    render() {
        let labelType = '';
        if (this.props.type === 'P') {
            labelType = "recipient-list__body-label-parent";
        } else if (this.props.type === "R") {
            labelType = "recipient-list__body-label-none";
        } else {
            labelType = "recipient-list__body-label-child";
        }
        return (
            <td className="recipient-list__body-cell">
                <span className={labelType}>{this.props.type}</span>
                <a href={`#/recipient/${this.props.id}`}>
                    {this.props.name}
                </a>
            </td>
        );
    }
}

RecipientLinkCell.propTypes = propTypes;
