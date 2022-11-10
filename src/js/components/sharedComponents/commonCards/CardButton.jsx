/**
 * CardBody.jsx
 * Created by Andrea Blackwell  09/09/2022
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const propTypes = {
    link: PropTypes.string,
    govLink: PropTypes.bool,
    onlyPerformAction: PropTypes.bool,
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
    ]),
    disabled: PropTypes.bool
};

const CardButton = ({
    link, govLink, onlyPerformAction = "false", action, text, variant = "secondary", customClassName = '', children, disabled
}) => {
    const variantMapper = {
        primary: "card__button--primary",
        secondary: "",
        text: "card__button--borderless"
    };

    if (onlyPerformAction === true) {
        return (
            <div className="card__button">
                <button
                    className={`card__button--secondary ${variantMapper[variant]} ${customClassName}`}
                    aria-label={`${text}`}
                    disabled={disabled}
                    onClick={action}>
                    {text || children}
                </button>
            </div>);
    }

    return (
        <div className="card__button">
            {govLink ? (
                <div
                    className={`card__button--secondary ${variantMapper[variant]}`}
                    role="button"
                    aria-label={`${text}`}>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={action}
                        href={link}>
                        {text}
                    </a>
                </div>
            )
                :
                (
                    <Link
                        className={`card__button--secondary ${variantMapper[variant]} ${customClassName}`}
                        role="button"
                        tabIndex={disabled ? "-1" : ""}
                        aria-label={`${text}`}
                        to={link}
                        onClick={action}>
                        {text || children}
                    </Link>
                )}
        </div>
    );
};

CardButton.propTypes = propTypes;
export default CardButton;
