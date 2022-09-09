/**
 * CardBody.jsx
 * Created by Andrea Blackwell
 */

import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    overline: PropTypes.object,
    headline: PropTypes.string,
    subhead: PropTypes.string,
    text: PropTypes.string,
    variant: PropTypes.string // inset
};

const CardBody = ({ overline, headline, subhead, text, variant, children }) => {
    return (
        <div className={`card__body ${variant}`}>
            {overline && <div className="overline">{overline}</div>}
            {headline && <div className="headline">{headline}</div>}
            {subhead && <div className="subhead">{subhead}</div>}
            {text && <div className="text">{text}</div>}
            {children}
        </div>
    );

};

CardBody.propTypes = propTypes;
export default CardBody;