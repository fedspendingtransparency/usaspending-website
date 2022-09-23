/**
 * CardBody.jsx
 * Created by Andrea Blackwell  09/09/2022
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const propTypes = {
    link: PropTypes.string,
    action: PropTypes.func,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]), // Can accept a string or markup
    variant: PropTypes.string, // primary, secondary, and text
    customClassName: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
};

const CardButton = ({
    link, action, text, variant = "secondary", customClassName = '', children
}) => {
    const variantMapper = {
        primary: "card__button--primary",
        sedondary: "",
        text: "card__button--borderless"
    };

    return (
        <div className="card__button">
            <Link
                className={`card__button--secondary ${variantMapper[variant]} ${customClassName}`}
                role="button"
                aria-label={`${text}`}
                to={link}
                onClick={action}>
                {text || children}
            </Link>
        </div>
    );
};

CardButton.propTypes = propTypes;
export default CardButton;
