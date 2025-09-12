/**
 * Error.jsx
 * Created by Emily Gullo 02/02/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    message: PropTypes.string
};

const Error = ({
    title = 'Error',
    message = "We're sorry, there has been an unexpected error.  Please try again in a few moments."
}) => (
    <main className="main-content" id="main-content">
        <div className="error-container">
            <h4>{title}</h4>
            <p>{message}</p>
        </div>
    </main>
);

Error.propTypes = propTypes;
export default Error;
