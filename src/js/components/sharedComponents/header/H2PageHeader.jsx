import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    headerText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string
};

const H2PageHeader = ({ headerText, body, className }) => (
    <div className={className}>
        <h2>{headerText}</h2>
        {typeof body === 'string' ? (<p>{body}</p>) : body}
    </div>
);

H2PageHeader.propTypes = propTypes;
export default H2PageHeader;
