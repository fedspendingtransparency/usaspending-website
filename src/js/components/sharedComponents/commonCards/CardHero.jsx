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
    imageContainerHeight: PropTypes.string,
    thumbnail: PropTypes.bool,
    children: PropTypes.element,
    onClick: PropTypes.func
};

const CardHero = ({
    img, fill, variant, imageContainerHeight, thumbnail, children, onClick
}) => (
    <div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
            className={`card__hero ${variant}`}
            onClick={onClick}
            style={{ backgroundColor: `${fill}`, height: `${imageContainerHeight}` }}>
            {thumbnail ?
                <>{ children }</>
                :
                <img src={`${img}`} role="presentation" alt="" />
            }
        </div>
    </div>
);

CardHero.propTypes = propTypes;
export default CardHero;
