/**
 * CardHero.jsx
 * Created by Andrea Blackwell
 */

import PropTypes from "prop-types";
import React from "react";

const propTypes = {
    img: PropTypes.string,
    fill: PropTypes.string,
    variant: PropTypes.string // inset or expanded
};

const CardHero = ({ img, fill, variant, size }) => {
    return (
        <div className={`card__hero ${variant} ${size}`} style={{ backgroundColor: `${fill}`, height: !img ? '12px' : 'inherit' }}>
            <img src={`${img}`} role="presentation" alt="" />
        </div>
    );
};

CardHero.propTypes = propTypes;
CardHero.defaultProps = { variant: 'expanded' };

export default CardHero;