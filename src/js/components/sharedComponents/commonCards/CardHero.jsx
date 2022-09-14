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
    size: PropTypes.string, // sm, md, lg
    imageContainerHeight: PropTypes.string
};

const CardHero = ({
    img, fill, variant, size, imageContainerHeight
}) => (
    <div className={`card__hero ${variant} ${size}`} style={{ backgroundColor: `${fill}`, height: `${imageContainerHeight}` }}>
        <img src={`${img}`} role="presentation" alt="" />
    </div>
);

CardHero.propTypes = propTypes;
CardHero.defaultProps = { variant: 'expanded' };

export default CardHero;
