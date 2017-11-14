/**
 * MapDisclaimer.jsx
 * Created by Kevin Li 11/7/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { ExclamationTriangle, Close } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    closeDisclaimer: PropTypes.func
};

const MapDisclaimer = (props) => (
    <div className="map-disclaimer">
        <div className="icon">
            <ExclamationTriangle alt="Disclaimer" />
        </div>
        <div className="content">
            <div className="header">
                <div className="title">
                    Not seeing international data?
                </div>
                <button
                    className="close"
                    title="Dismiss message"
                    aria-label="Dismiss message"
                    onClick={props.closeDisclaimer}>
                    <Close alt="Dismiss message" />
                </button>
            </div>
            <div className="description">
                We&apos;re currently geocoding all of our international data and will be implementing it soon.
            </div>
        </div>
    </div>
);

MapDisclaimer.propTypes = propTypes;

export default MapDisclaimer;
