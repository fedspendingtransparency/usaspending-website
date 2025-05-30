/**
  * NoResultsMessage.jsx
  * Created by Jonathan Hill 05/07/19
  **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    message: PropTypes.string
};

const NoResultsMessage = ({
    title = 'Not Available',
    message = 'No available data to display'
}) => (
    <div className="no-results-container">
        <div className="no-results-title">
            <h4>
                {title}
            </h4>
        </div>
        <div className="no-results-message">
            <p>{message}</p>
        </div>
    </div>
);

NoResultsMessage.propTypes = propTypes;
export default NoResultsMessage;
