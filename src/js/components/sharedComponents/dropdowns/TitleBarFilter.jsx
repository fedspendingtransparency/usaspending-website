/**
 * TitleBarFilter.jsx
 * Created by Nick Torres 1/31/2024
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'small', 'medium', 'large']),
    label: PropTypes.string,
    buttonText: PropTypes.string,
    leftIcon: PropTypes.element,
    enabled: PropTypes.bool
};

export const TitleBarFilter = ({
    size, label, buttonText, leftIcon, enabled
}) => {
    const [expanded, setExpanded] = useState(false);
    const [isEnabled, setIsEnabled] = useState(enabled || false);

    let variation = '';
    if (size === 'sm' || size === 'small') {
        variation = '-sm';
    }
    else if (size === 'md' || size === 'medium') {
        variation = '-md';
    }
    else if (size === 'lg' || size === 'large') {
        variation = '-lg';
    }
    return (
        <div className="filter__dropdown-container">
            {label !== '' && <span className={`filter__dropdown-label${variation} ${isEnabled ? 'enabled' : 'not-enabled'}`}>{label}</span>}
            <button className={`filter__dropdown-button${variation} ${isEnabled ? 'enabled' : 'not-enabled'}`}>
                <span className="filter__dropdown-left-icon">
                    <FontAwesomeIcon icon={leftIcon} alt="page title bar button icon" />
                </span>
                <span className="filter__dropdown-button-text">{buttonText}</span>
                <span className="filter__dropdown-chevron">
                    {!expanded && (
                        <FontAwesomeIcon icon="chevron-down" alt="Toggle menu" />
                    )}
                    {expanded && (
                        <FontAwesomeIcon icon="chevron-up" alt="Toggle menu" />
                    )}
                </span>
            </button>
        </div>
    );
};

TitleBarFilter.propTypes = propTypes;
export default TitleBarFilter;
