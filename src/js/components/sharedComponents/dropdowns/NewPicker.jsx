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
    leftIcon: PropTypes.string,
    sortFn: PropTypes.func,
    icon: PropTypes.node,
    selectedOption: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    className: PropTypes.string,
    dropdownClassName: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.number]),
        value: PropTypes.any,
        onClick: PropTypes.func,
        classNames: PropTypes.string
    })),
    children: PropTypes.node,
    backgroundColor: PropTypes.string,
    enabled: PropTypes.bool
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
    dropdownClassName = '',
    sortFn = defaultSort
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
        <div className="filter__dropdown-container" ref={pickerRef}>
            {label !== '' && <span className={`filter__dropdown-label${variation} ${isEnabled ? 'enabled' : 'not-enabled'}`}>{label}</span>}
            <div className="filter__dropdown-button-list-container">
                <button
                    className={`filter__dropdown-button${variation} ${isEnabled ? 'enabled' : 'not-enabled'}`}
                    ref={buttonRef}
                    aria-label="Filter Dropdown Button"
                    onClick={toggleMenu}
                    onKeyUp={keyUp}>
                    <span className="filter__dropdown-left-icon">
                        <FontAwesomeIcon icon={leftIcon} alt="page title bar button icon" />
                    </span>
                    {children ?
                        <>{children}</> :
                        <span className="filter__dropdown-button-text">
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
                <ul className={`filter__dropdown-list${variation} ${expanded ? '' : 'hide'} ${isEnabled ? 'enabled' : 'not-enabled'} ${dropdownClassName}`}>
                    {options?.sort(handleSort)
                        .map((option) => ({
                            ...option,
                            onClick: createOnClickFn(option.onClick)
                        }))
                        .map((option) => (
                            <li key={uniqueId()} className={`filter__dropdown-list-item ${option?.classNames ? option.classNames : ''} ${option.name.trim() === selectedOption.trim() ? 'active' : ''}`}>
                                <button
                                    className="filter__dropdown-item"
                                    value={`${option.value || option.name}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        option.onClick(option.value);
                                    }}>
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
