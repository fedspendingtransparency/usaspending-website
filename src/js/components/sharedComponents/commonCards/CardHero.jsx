/**
 * CardHero.jsx
 * Created by Andrea Blackwell  09/09/2022
 */

import PropTypes from "prop-types";
import React from "react";

const propTypes = {
    img: PropTypes.string,
    fill: PropTypes.string,
    variant: PropTypes.string, // inset or expanded
    imageContainerHeight: PropTypes.string
};

const CardHero = ({
    img, fill, variant = "expanded", imageContainerHeight
}) => (
    <div className={`card__hero ${variant}`} style={{ backgroundColor: `${fill}`, height: `${imageContainerHeight}` }}>
        <img src={`${img}`} role="presentation" alt="" />
    </div>
);

CardHero.propTypes = propTypes;
export default CardHero;
