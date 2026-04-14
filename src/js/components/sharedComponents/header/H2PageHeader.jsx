import PropTypes from "prop-types";
import React from "react";

const propTypes = {
    headerCopy: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string
};

const H2PageHeader = ({ headerCopy, body, className = "" }) => {
    let stuff;

    return (
        <div className={className} >
            <h2>{headerCopy}</h2>
            { typeof body === "string" ? <p>{body}</p> : body }
        </div>
    );
};

H2PageHeader.propTypes = propTypes;
export default H2PageHeader;
