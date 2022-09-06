import PropTypes from "prop-types";
import React from "react";

const propTypes = {
    img: PropTypes.object,
    fill: PropTypes.string
};

const Hero = ({ img, fill }) => {
    return (
        <div style={{backgroundColor: `${fill}`}}>
            {img}
        </div>
    );
};

Hero.propTypes = propTypes;
export default Hero;