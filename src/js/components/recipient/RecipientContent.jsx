/**
 * RecipientContent.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    recipient: PropTypes.object
};

export default class RecipientContent extends React.Component {
    render() {
        return (

            <div className="recipient-content-wrapper">
                {JSON.stringify(this.props.recipient)}
            </div>

        );
    }
}

RecipientContent.propTypes = propTypes;
