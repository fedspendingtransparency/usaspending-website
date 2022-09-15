/**
 * CardBody.jsx
 * Created by Andrea Blackwell 09/09/2022
 */

import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    overline: PropTypes.string,
    headline: PropTypes.string || PropTypes.element,
    subhead: PropTypes.string,
    text: PropTypes.string,
    variant: PropTypes.string, // inset or no-variant
    children: PropTypes.element
};

const CardBody = ({
    overline, headline, subhead, text, variant, children
}) => (
    <div className={`card__body ${variant}`}>
        {overline && <div className="overline">{overline}</div>}
        {headline && <div className="headline">{headline}</div>}
        {subhead && <div className="subhead">{subhead}</div>}
        {text && <div className="text">{text}</div>}
        {children}
    </div>
);

CardBody.propTypes = propTypes;
export default CardBody;
