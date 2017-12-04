/**
 * MapMessage.jsx
 * Created by Kevin Li 11/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    message: PropTypes.string
};

const MapMessage = (props) => (
    <div className="map-message">
        {props.message}
    </div>
);

MapMessage.propTypes = propTypes;

export default MapMessage;
