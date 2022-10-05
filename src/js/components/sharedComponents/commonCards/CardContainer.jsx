/**
 * CardContainer.jsx
 * Created by Andrea Blackwell  09/09/2022
 */

import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    variant: PropTypes.string, // elevated, outline, or none
    size: PropTypes.string, // sm, md, or lg
    fill: PropTypes.string,
    height: PropTypes.number,
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
};

const CardContainer = ({
    variant = '', size = "md", children, fill, height, className
}) => (
    <div className={`card-column ${className}`}>
        <div className={`${variant} ${size} card-container`} style={{ backgroundColor: `${fill}`, height: `${height}` }}>
            { children }
        </div>
    </div>

);

CardContainer.propTypes = propTypes;
export default CardContainer;
