/**
 * Covid.jsx
 * Created by Brian Petway 03/30/2022
 */

import React from 'react';
import PropTypes from "prop-types";

require('components/_card.scss');

const propTypes = {
    icon: PropTypes.object,
    heading: PropTypes.string,
    content: PropTypes.object,
    link: PropTypes.object
};

const Card = () => {
    return (
        <div className="card-content">
            <div className="card__icon-wrapper">
                placeholder for icon
            </div>
            <div className="card__heading-wrapper">
                placeholder for heading
            </div>
            <div className="card__content-wrapper">
                placeholder for content
            </div>
            <div className="card__link-wrapper">
                placeholder for link
            </div>
        </div>
    );
};

Card.propTypes = propTypes;
export default Card;
