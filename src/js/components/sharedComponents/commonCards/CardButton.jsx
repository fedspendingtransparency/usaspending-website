/**
 * CardBody.jsx
 * Created by Andrea Blackwell  09/09/2022
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CardContainer from "./CardContainer";

const propTypes = {
    link: PropTypes.string,
    action: PropTypes.func,
    // text: PropTypes.string || PropTypes.object, // Can accept a string or markup
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Can accept a string or markup
    variant: PropTypes.string // primary, secondary, and text

};

const CardButton = ({
    link, action, text, variant
}) => {
    const variantMapper = {
        primary: "card__button--primary",
        text: "card__button--borderless"
    };

    return (
        <div className="card__button">
            <Link
                className={`card__button--secondary ${variantMapper[variant]}`}
                role="button"
                aria-label={`${text}`}
                to={link}
                onClick={action}>
                {text}
            </Link>
        </div>
    );
};

CardButton.propTypes = propTypes;
CardContainer.defaultProps = { variant: 'secondary' };

export default CardButton;
