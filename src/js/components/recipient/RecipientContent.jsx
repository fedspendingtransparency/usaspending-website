/**
 * RecipientContent.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import RecipientOverview from './RecipientOverview';

const propTypes = {
    recipient: PropTypes.object
};

export default class RecipientContent extends React.Component {
    render() {
        return (
            <div className="recipient-content">
                <RecipientOverview
                    recipient={this.props.recipient.overview} />
            </div>
        );
    }
}

RecipientContent.propTypes = propTypes;
