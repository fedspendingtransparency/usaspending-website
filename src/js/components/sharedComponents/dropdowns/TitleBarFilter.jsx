/**
 * TitleBarFilter.jsx
 * Created by Nick Torres 1/31/2024
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { allFiscalYears, currentFiscalYear, earliestFiscalYear, getFiscalYearsWithLatestAndAll } from '../../../helpers/fiscalYearHelper';

const propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'small', 'medium', 'large']),
    label: PropTypes.string,
    buttonText: PropTypes.string,
    leftIcon: PropTypes.string,
    enabled: PropTypes.bool,
    sortFn: PropTypes.func,
    selectedOption: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    className: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.number]),
        value: PropTypes.any,
        onClick: PropTypes.func,
        classNames: PropTypes.string
    })),
    selectedFy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    earliestFy: PropTypes.number,
    latestFy: PropTypes.number,
    handleFyChange: PropTypes.func,
    dropdownBackgroundColor: PropTypes.string
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

const defaultNumberSort = (a, b) => {
    if (Number.isInteger(a)) return b - a;
    return parseInt(b, 10) - parseInt(a, 10);
};

export const TitleBarFilter = ({
    size, label, buttonText, leftIcon, enabled, sortFn = defaultNumberSort, selectedOption, id, options, selectedFy = 2020, earliestFy = 2017, latestFy, handleFyChange, dropdownBackgroundColor = '#fff'
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

    const renderOptions = () => {
        // override default earliest/latest options
        if (options?.length) return options?.map((obj) => ({ ...obj, onClick: handleFyChange }));
        if (latestFy) {
            return allFiscalYears(earliestFy, latestFy)
                .map((year) => ({ name: `FY ${year}`, value: `${year}`, onClick: handleFyChange }));
        }
        return [{ name: 'Loading fiscal years...', value: null, onClick: () => { } }];
    };

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

    if (options === null) {
        // eslint-disable-next-line no-param-reassign
        options = renderOptions(getFiscalYearsWithLatestAndAll(earliestFiscalYear, currentFiscalYear()));
    }

    return (
        <div className="filter__dropdown-container" ref={pickerRef}>
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
            <ul className={`filter__dropdown-list${variation} ${expanded ? '' : 'hide'} ${isEnabled ? 'enabled' : 'not-enabled'}`} style={{ backgroundColor: dropdownBackgroundColor}}>
                {options?.sort(handleSort)
                    .map((option) => ({
                        ...option,
                        onClick: createOnClickFn(option.onClick)
                    }))
                    .map((option) => (
                        <li key={uniqueId()} className={`filter__dropdown-list-item ${option?.classNames ? option.classNames : ''}`}>
                            <button
                                className={`filter__dropdown-item ${option.name === selectedOption ? 'active' : ''}`}
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
    );
};

TitleBarFilter.propTypes = propTypes;
export default TitleBarFilter;
