/**
 * MapMessage.jsx
 * Created by Kevin Li 11/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node
};

const MapMessage = (props) => (
    <div className="map-message-container">
        <div className="map-message">
            {props.children}
        </div>
    </div>
);

MapMessage.propTypes = propTypes;

export default MapMessage;
