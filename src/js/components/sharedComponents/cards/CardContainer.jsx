/**
 * CardContainer.jsx
 * Created by Andrea Blackwell
 */

import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    variant: PropTypes.string, // possible variants are elevated or outline
    size: PropTypes.string,  // sm, md, or lg
    fill: PropTypes.string,
    height: PropTypes.number // Brian's suggestion
};

const CardContainer = ({
                  variant, size, children, fill, height
              }) => {
    return (
        <div className={`${variant} ${size} card-container`} style={{backgroundColor: `${fill}`, height: `${height}`}}>
            <div>{children}</div>
        </div>
    );

};

CardContainer.propTypes = propTypes;
CardContainer.defaultProps = { size: 'md' };

export default CardContainer;