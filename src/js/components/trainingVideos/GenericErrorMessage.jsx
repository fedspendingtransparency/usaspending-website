/**
 * GenericErrorMessage.jsx
 * Created by Andrea Blackwell 1/19/23
 */

import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    message: PropTypes.string,
    emailSubject: PropTypes.string
};

const GeneralErrorMessage = ({ message, emailSubject }) => (
    <div className="generic-error-message-container">
        <div className="error-message">
            <p className="error-message__paragraph-one">Something went wrong</p>
            <p className="error-message__paragraph-two">{message}</p>
            {/* eslint-disable-next-line no-return-assign */}
            <button className="error-message__button" onClick={() => window.location = `mailto:usaspending.help@fiscal.treasury.gov?subject=${emailSubject}`}>Report this error</button>
        </div>
    </div>
);

GeneralErrorMessage.propTypes = propTypes;
export default GeneralErrorMessage;
