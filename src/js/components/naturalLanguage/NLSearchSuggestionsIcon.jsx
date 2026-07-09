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
    icon: PropTypes.string
};

const NLSearchSuggestionsIcon = ({ variant, label, icon}) => (
    <div className={`icon-row icon-row--${variant}`}>
        <div className={`icon-container icon-container--${variant}`}>
            <FontAwesomeIcon className={`icon icon--${variant}`} icon={icon} />
        </div>
        <span className={`icon-label icon-label--${variant}`}>{label}</span>
    </div>
)

NLSearchSuggestionsIcon.propTypes = propTypes;
export default NLSearchSuggestionsIcon;