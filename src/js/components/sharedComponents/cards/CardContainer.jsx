/**
 * Card.jsx
 * Created by Andrea Blackwell
 */

import React from 'react';
import PropTypes from "prop-types";

require('components/cards/cardContainer.scss');

const propTypes = {
    variant: PropTypes.object,
    size: PropTypes.string,
    fill: PropTypes.string
};

const CardContainer = ({
                  variant, size, children, fill
              }) => {
    return (
        <div className={`${variant} ${size} card-container`} style={{backgroundColor: `${fill}`}}>
            <div>{children}</div>
        </div>
    );

};

CardContainer.propTypes = propTypes;
export default CardContainer;