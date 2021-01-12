/**
 * FYPicker.jsx
 * Created by Kevin Li 8/16/17
 */

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

const propTypes = {
    fy: PropTypes.string,
    onClick: PropTypes.func,
    earliestFY: PropTypes.number,
    icon: PropTypes.string,
    altText: PropTypes.string,
    iconColor: PropTypes.string,
    iconSize: PropTypes.string,
    sortFn: PropTypes.func,
    latestFy: PropTypes.number,
    isLoading: PropTypes.bool
};

export const defaultSortFy = (a, b) => {
    if (a > b) return -1;
    if (b > a) return 1;
    return 0;
};

const FYPicker = ({
    sortFn = defaultSortFy,
    latestFy = FiscalYearHelper.currentFiscalYear(),
    fy,
    onClick,
    earliestFY = FiscalYearHelper.earliestExplorerYear,
    icon = "calendar-alt",
    altText = "Fiscal Year",
    iconColor = "white",
    iconSize = "lg",
    isLoading
}) => {
    const pickerRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const toggleMenu = (e) => {
        e.preventDefault();
        setExpanded(!expanded);
    };

    useEffect(() => {
        const closeMenu = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setExpanded(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        onClick(e.target.value);
        setExpanded(false);
    };

    const getActiveYears = () => {
        if (latestFy) {
            return FiscalYearHelper.allFiscalYears(earliestFY, latestFy)
                .sort(sortFn)
                .map((year) => (
                    <li key={year} className="fy-picker__list-item">
                        <button
                            className={`fy-picker__item ${year === fy ? 'active' : ''}`}
                            value={`${year}`}
                            onClick={handleClick}>
                            FY {year}
                        </button>
                    </li>
                ));
        }

        return <li>Loading...</li>;
    };

    return (
        <div className="fy-picker" ref={pickerRef}>
            <div className="fy-picker__header">
                <div className="fy-picker__icon">
                    <FontAwesomeIcon icon={icon} alt={altText} color={iconColor} size={iconSize} />
                </div>
                <div className="fy-picker__dropdown-container">
                    <button className="fy-picker__button" onClick={toggleMenu}>
                        <span className="fy-picker__button-text">
                            FY {isLoading ? <FontAwesomeIcon icon="spinner" size="sm" alt="Toggle menu" spin /> : fy}
                        </span>
                        <div className="fy-picker__button-icon">
                            <FontAwesomeIcon icon="chevron-down" alt="Toggle menu" />
                        </div>
                    </button>
                    <ul className={`fy-picker__list ${expanded ? '' : 'hide'}`}>
                        {getActiveYears()}
                    </ul>
                </div>
            </div>
        </div>
    );
};

FYPicker.propTypes = propTypes;

export default FYPicker;
