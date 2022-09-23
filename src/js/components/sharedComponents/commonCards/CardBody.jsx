/**
 * CardBody.jsx
 * Created by Andrea Blackwell 09/09/2022
 */

import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    overline: PropTypes.string,
    headline: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    subhead: PropTypes.string,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    variant: PropTypes.string, // inset or no-variant
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    imageContainerHeight: PropTypes.string,
    customClassName: PropTypes.string
};

const CardBody = ({
    overline, headline, subhead, text, variant = '', children, imageContainerHeight, customClassName = ""
}) => (
    <div className={`card__body ${variant} ${customClassName}`} style={{ height: imageContainerHeight ? `calc(100% - ${imageContainerHeight} - 12px)` : '' }}>
        {overline && <div className="overline">{overline}</div>}
        {headline && <div className="headline">{headline}</div>}
        {subhead && <div className="subhead">{subhead}</div>}
        {text && <div className="text">{text}</div>}
        {children}
    </div>
);

CardBody.propTypes = propTypes;
export default CardBody;
