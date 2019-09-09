/**
 * ProgramSourceInfoTooltip.jsx
 * Created by Lizzie Salita 8/07/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    definition: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    heading: PropTypes.string,
    example: PropTypes.string,
    description: PropTypes.string
};

const ProgramSourceInfoTooltip = (props) => (
    <div
        className={`tooltip-popover-container ${props.description ? 'tooltip-popover-container_description' : ''}`}
        tabIndex="0"
        role="button">
        {<span className="tooltip-popover-container__description">{props.description}</span> || ''}
        <FontAwesomeIcon icon="info-circle" />
        <span className="program-source-info-tooltip tooltip-popover">
            <div className="program-source-info-tooltip__heading">
                {props.heading}
            </div>
            <div className="program-source-info-tooltip__definition">
                {props.definition}
            </div>
            <div className="program-source-info-tooltip__example">
                {props.example ? `Example value: ${props.example}` : ''}
            </div>
        </span>
    </div>
);

ProgramSourceInfoTooltip.propTypes = propTypes;
export default ProgramSourceInfoTooltip;
