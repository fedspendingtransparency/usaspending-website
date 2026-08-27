/**
 * 
 * NLSearchSuggestions.jsx 
 * Created by Trey Morgan 7/8/2026
 */

import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    variant: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

const NLSearchSuggestionsIcon = ({ variant, label, icon, description = ''}) => (
    <div className={`icon-row icon-row--${variant}
        ${description ? 'icon-row__with-description' : ''}`}>
            
        <div className={`icon-container icon-container--${variant}`}>
            <FontAwesomeIcon className={`icon icon--${variant}`} icon={icon} />
        </div>
        <div 
            className={`icon-label icon-label--${variant} 
                ${description ? 'icon-label__with-description' : ''}`} >
            <span>{label}</span>
            { description && 
            <span className={`icon-description icon-description--${variant}`} >
                {description}
            </span>}
        </div>
    </div>
)

NLSearchSuggestionsIcon.propTypes = propTypes;
export default NLSearchSuggestionsIcon;