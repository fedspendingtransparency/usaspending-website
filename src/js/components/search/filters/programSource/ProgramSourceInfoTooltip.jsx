/**
 * ProgramSourceInfoTooltip.jsx
 * Created by Lizzie Salita 8/07/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    definition: PropTypes.string,
    heading: PropTypes.string,
    example: PropTypes.string
};

const ProgramSourceAutocompleteContainer = (props) => (
    <div className="tooltip-popover-container" tabIndex="0" role="button">
        <FontAwesomeIcon icon="info-circle" />
        <span className="program-source-info-tooltip tooltip-popover">
            <div className="program-source-info-tooltip__heading">
                {props.heading}
            </div>
            <div className="program-source-info-tooltip__definition">
                {props.definition}
            </div>
            <div className="program-source-info-tooltip__example">
                Example value: {props.example}
            </div>
        </span>
    </div>
);

ProgramSourceAutocompleteContainer.propTypes = propTypes;
export default ProgramSourceAutocompleteContainer;
