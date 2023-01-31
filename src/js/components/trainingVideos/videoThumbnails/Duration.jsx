/**
 * Duration.jsx
 * Created by Brian Petway 12/22/22
 */

import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    duration: PropTypes.string,
    isFeaturedVideo: PropTypes.bool
};

const Duration = ({ duration, isFeaturedVideo }) => (
    <div className={`overlay-duration ${isFeaturedVideo ? 'featured-video' : ''}`}>
        <span className="duration-text">{duration}</span>
    </div>
);

Duration.propTypes = propTypes;
export default Duration;
