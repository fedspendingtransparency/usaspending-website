/**
 * RecipientLinkCell.jsx
 * Created by David Trinh 7/3/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
            labelType = "recipient-landing__icon recipient-landing__icon_parent";
        }
        else if (this.props.type === "R") {
            labelType = "recipient-landing__icon recipient-landing__icon_recipient";
        }
        else {
            labelType = "recipient-landing__icon recipient-landing__icon_child";
        }
        return (
            <td className="recipient-list__body-cell">
                <span className={labelType}>{this.props.type}</span>
                <Link to={`/recipient/${this.props.id}/latest`}>
                    {this.props.name}
                </Link>
            </td>
        );
    }
}

RecipientLinkCell.propTypes = propTypes;
