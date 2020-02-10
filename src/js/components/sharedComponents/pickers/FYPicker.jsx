/**
 * FYPicker.jsx
 * Created by Kevin Li 8/16/17
 */

import React, { createRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    fy: PropTypes.string,
    onClick: PropTypes.func,
    earliestFY: PropTypes.number,
    icon: PropTypes.string,
    altText: PropTypes.string,
    iconColor: PropTypes.string,
    iconSize: PropTypes.string,
    sortFn: PropTypes.func
};

const pickerRef = createRef();
const listOfFy = [];
const currentFY = FiscalYearHelper.defaultFiscalYear();

const FYPicker = ({
    fy,
    sortFn = () => {},
    onClick,
    earliestFY = FiscalYearHelper.earliestExplorerYear,
    icon = "calendar-alt",
    altText = "Fiscal Year",
    iconColor = "white",
    iconSize = "lg"
}) => {
    const [expanded, setExpanded] = useState(false);
    const toggleMenu = () => setExpanded(!expanded);

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
        onClick(e.target.value);
        setExpanded(false);
    };

    for (let year = earliestFY; year <= currentFY; year++) {
        if (!listOfFy.includes(`${year}`)) listOfFy.push(`${year}`);
    }

    return (
        <div className="fy-picker" ref={pickerRef}>
            <div className="fy-picker__header">
                <div className="fy-picker__icon">
                    <FontAwesomeIcon icon={icon} alt={altText} color={iconColor} size={iconSize} />
                </div>
                <div className="fy-picker__dropdown-container">
                    <button className="fy-picker__button" onClick={toggleMenu}>
                        <span className="fy-picker__button-text">
                            FY {fy}
                        </span>
                        <div className="fy-picker__button-icon">
                            <FontAwesomeIcon icon="chevron-down" alt="Toggle menu" />
                        </div>
                    </button>
                    <ul className={`fy-picker__list ${expanded ? '' : 'hide'}`}>
                        {listOfFy
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
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

FYPicker.propTypes = propTypes;

export default FYPicker;
