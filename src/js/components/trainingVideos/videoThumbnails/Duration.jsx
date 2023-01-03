/**
 * Duration.jsx
 * Created by Brian Petway 12/22/22
 */

import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    duration: PropTypes.string
};

const Duration = ({ duration }) => (
    <div className="overlay-duration">
        <span className="duration-text">{duration}</span>
    </div>
);

Duration.propTypes = propTypes;
export default Duration;
