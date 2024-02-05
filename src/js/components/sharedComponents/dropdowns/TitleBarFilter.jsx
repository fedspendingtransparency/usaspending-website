/**
 * TitleBarFilter.jsx
 * Created by Nick Torres 1/31/2024
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'small', 'medium', 'large']),
    label: PropTypes.string,
    buttonText: PropTypes.string,
    leftIcon: PropTypes.element,
    enabled: PropTypes.bool,
    sortFn: PropTypes.func,
    selectedOption: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    className: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        value: PropTypes.any,
        onClick: PropTypes.func,
        classNames: PropTypes.string
    }))
};

const defaultSort = (a, b, selectedOption) => {
    // if no sort fn is provided, sort active element to lowest index
    if (a.name === selectedOption) return -1;
    if (b.name === selectedOption) return 1;
    // then, sort alphabetically
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
};

export const TitleBarFilter = ({
    size, label, buttonText, leftIcon, enabled, sortFn = defaultSort, selectedOption, id, options
}) => {
    const pickerRef = useRef(null);
    const buttonRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [isEnabled, setIsEnabled] = useState(enabled || false);
    const fontAwesomeIconId = "usa-dt-picker__button-icon--svg";

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

    const toggleMenu = (e) => {
        e.preventDefault();
        if (!expanded) {
            setExpanded(!expanded);
        }
    };

    const enableButton = (e) => {
        e.preventDefault();
        if (!isEnabled) {
            setIsEnabled(!isEnabled);
        }
    };

    const handleSort = (a, b) => sortFn(a, b, selectedOption);
    useEffect(() => {
        const closeMenu = (e) => {
            if ((
                expanded &&
                pickerRef.current &&
                !pickerRef.current.contains(e.target) &&
                e.target.id !== `${id}-${fontAwesomeIconId}` &&
                e.target.parentNode.id !== `${id}-${fontAwesomeIconId}`
            )) {
                setExpanded(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, [expanded, id]);

    const createOnClickFn = (cb) => (param) => {
        cb(param);
        setExpanded(false);
    };

    return (
        <div className="filter__dropdown-container">
            {label !== '' && <span className={`filter__dropdown-label${variation} ${isEnabled ? 'enabled' : 'not-enabled'}`}>{label}</span>}
            <button
                className={`filter__dropdown-button${variation} ${isEnabled ? 'enabled' : 'not-enabled'}`}
                ref={buttonRef}
                aria-label="Filter Dropdown Button"
                onClick={toggleMenu}>
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
            <ul className={`filter__dropdown-list ${expanded ? '' : 'hide'}`}>
                {options
                    .sort(handleSort)
                    .map((option) => ({
                        ...option,
                        onClick: createOnClickFn(option.onClick)
                    }))
                    .map((option) => (
                        <li key={uniqueId()} className={`usa-dt-picker__list-item ${option?.classNames ? option.classNames : ''}`}>
                            <button
                                className={`usa-dt-picker__item ${option.name === selectedOption ? 'active' : ''}`}
                                value={`${option.value || option.name}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    option.onClick(option.value);
                                }}
                                onKeyDown={(e) => {
                                    if (option.name === 'reddit' && e.key === 'Tab') {
                                        setExpanded(!expanded);
                                    }
                                }}>
                                {option.component ? option.component : option.name}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

TitleBarFilter.propTypes = propTypes;
export default TitleBarFilter;
