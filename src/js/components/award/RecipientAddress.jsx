/**
 * RecipientAddress.jsx
 * Created by Emily Gullo 01/31/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    location: PropTypes.object,
    type: PropTypes.string
};

export default class RecipientAddress extends React.Component {
    render() {
        const location = this.props.location;
        return (
            <li className={this.props.type}>
                <div className="item-label">
                    Address
                </div>
                <div className="item-value">
                    {location.fullAddress}
                </div>
            </li>
        );
    }
}
RecipientAddress.propTypes = propTypes;
