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

const NLSearchSuggestionsIcon = ({ variant, label, icon }) => (
    <div className="search-suggestions__icon-row">
        <div className={`search-suggestions__icon-container search-suggestions__icon-container--${variant}`}>
            <FontAwesomeIcon className={`icon icon--${variant}`} icon={icon} />
        </div>
        <span className="label">{label}</span>
    </div>
)


NLSearchSuggestionsIcon.propTypes = propTypes;
export default NLSearchSuggestionsIcon