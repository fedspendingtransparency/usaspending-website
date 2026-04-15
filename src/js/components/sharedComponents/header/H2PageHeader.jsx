import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    headerCopy: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string
};

const H2PageHeader = ({ headerCopy, body, className = "" }) => {
    let stuff;

    return (
        <div className={`h2-page-header ${className}`} >
            <h2 className="h2-page-header__title">{headerCopy}</h2>
            <div className="h2-page-header__subtitle">{body}</div>
        </div>
    );
};

H2PageHeader.propTypes = propTypes;
export default H2PageHeader;
