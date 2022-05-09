/**
 * EntityWarning.jsx
 * Created by Kevin Li 10/31/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';


const propTypes = {
    message: PropTypes.node
};

const EntityWarning = (props) => (
    <div className="warning-tooltip">
        <div className="warning-content">
            <div className="tooltip-pointer left" />
            <div className="icon">
                <ExclamationTriangle alt="Warning" />
            </div>
            <div className="message">
                {props.message}
            </div>
        </div>
    </div>
);

EntityWarning.propTypes = propTypes;

export default EntityWarning;
