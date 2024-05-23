/**
 * NewPicker.jsx
 * Created by Nick Torres 2/7/2024
 */

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uniqueId } from 'lodash';

const propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'small', 'medium', 'large']),
    label: PropTypes.string,
    leftIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    sortFn: PropTypes.func,
    icon: PropTypes.node,
    selectedOption: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    classname: PropTypes.string,
    dropdownClassname: PropTypes.string,
    buttonClassname: PropTypes.string,
    minTextWidth: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.number]),
        value: PropTypes.any,
        onClick: PropTypes.func,
        classNames: PropTypes.string
    })),
    children: PropTypes.node,
    backgroundColor: PropTypes.string,
    enabled: PropTypes.bool,
    parentWidth: PropTypes.number
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

const NewPicker = ({
    size,
    label = '',
    children,
    leftIcon,
    enabled,
    id = '',
    options,
    selectedOption,
    dropdownClassname = '',
    buttonClassname = '',
    minTextWidth = '',
    classname = '',
    sortFn = defaultSort,
    parentWidth
}) => {
    const pickerRef = useRef(null);
    const buttonRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isEnabled, setIsEnabled] = useState(enabled || false);
    const fontAwesomeIconId = "usa-dt-picker__button-icon--svg";

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

    useEffect(() => {
        setIsEnabled(enabled);
    }, [enabled]);

    const toggleMenu = (e) => {
        e.preventDefault();
        setExpanded(!expanded);
    };

    const keyUp = (e) => {
        if (e.key === "Escape" && expanded) {
            setExpanded(!expanded);
        }
    };

    const handleSort = (a, b) => sortFn(a, b, selectedOption);
    // may need this when going from disabled to enabled in the future
    // const enableButton = (e) => {
    //     e.preventDefault();
    //     if (!isEnabled) {
    //         setIsEnabled(!isEnabled);
    //     }
    // };
    const createOnClickFn = (cb) => (param) => {
        cb(param);
        setExpanded(false);
    };

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
        <div className={`filter__dropdown-container ${classname}`} ref={pickerRef}>
            {label !== '' && <span className={`filter__dropdown-label${variation}`}>{label}</span>}
            <div className="filter__dropdown-button-list-container">
                <button
                    className={`filter__dropdown-button${variation} ${isEnabled ? 'enabled' : 'not-enabled'} ${buttonClassname}`}
                    ref={buttonRef}
                    aria-label="Filter Dropdown Button"
                    onClick={toggleMenu}
                    onKeyUp={keyUp}
                    style={{ maxWidth: `${parentWidth}px` }} >
                    {leftIcon &&
                        <span className="filter__dropdown-left-icon">
                            <FontAwesomeIcon icon={leftIcon} alt="page title bar button icon" />
                        </span>
                    }
                    {children ?
                        <>{children}</> :
                        <span className={`filter__dropdown-button-text ${minTextWidth}`}>
                            {selectedOption}
                        </span>
                    }
                    <span className="filter__dropdown-chevron">
                        {!expanded && (
                            <FontAwesomeIcon icon="chevron-down" alt="Toggle menu" />
                        )}
                        {expanded && (
                            <FontAwesomeIcon icon="chevron-up" alt="Toggle menu" />
                        )}
                    </span>
                </button>
                <ul className={`filter__dropdown-list${variation} ${expanded ? '' : 'hide'} ${isEnabled ? 'enabled' : 'not-enabled'} ${dropdownClassname}`} style={{ maxWidth: `${parentWidth}px` }}>
                    {options?.sort(handleSort)
                        .map((option) => ({
                            ...option,
                            onClick: createOnClickFn(option.onClick)
                        }))
                        .map((option) => (
                            <li
                                key={uniqueId()}
                                className={`filter__dropdown-list-item ${option?.classNames ? option.classNames : ''} ${option.name.trim() === selectedOption.trim() ? 'active' : ''}`}>
                                <button
                                    style={{ display: "block", width: "100%" }}
                                    tabIndex={0}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        option.onClick(option.value);
                                    }}
                                    onKeyUp={(e) => {
                                        e.preventDefault();
                                        if (e.key === "Enter") {
                                            option.onClick(option.value);
                                        }
                                    }}
                                    className="filter__dropdown-item">
                                    {option.component ? option.component : option.name}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

NewPicker.propTypes = propTypes;
export default NewPicker;
