/**
 * SubawardToggle.jsx
 * Created by JD House 01/2026
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Analytics from 'helpers/analytics/Analytics';


const propTypes = {
    setSearchViewSubaward: PropTypes.func,
    selectedValue: PropTypes.string,
    label: PropTypes.string,
    setSpendingLevel: PropTypes.func
};

const FilterAwardToggle = ({
    selectedValue = 'awards',
    setSearchViewSubaward,
    label = "View By",
    setSpendingLevel
}) => {
    const [selected, setSelected] = useState(selectedValue);
    const dispatch = useDispatch();

    const onToggle = (type) => {
        dispatch(setSearchViewSubaward(type === 'subawards'));
        dispatch(setSpendingLevel(type));
        setSelected(type);

        if (type === 'subawards') {
            Analytics.event({
                event: 'search_subaward_dropdown',
                category: 'Advanced Search - Search Fields',
                action: 'Subawards Search',
                gtm: true
            });
        }
    };

    const buttonOptions = [
        {
            name: 'Prime Awards and Transactions',
            value: 'awards'
        },
        {
            name: 'Subawards',
            value: 'subawards'
        }
    ];

    return (
        <div className="filter-award-toggle__container">
            <p className="filter-award-toggle__label">{label}</p>
            <div className="filter-award-toggle__wrapper">
                {buttonOptions.map((type) => (
                    <button
                        id={type.name}
                        className={`filter-award-toggle__button ${selected === type.value ? "active" : ""}`}
                        tabIndex="0"
                        onClick={() => onToggle(type.value)}
                        onKeyDown={(e) => (e.key === "Enter" ? onToggle(type.value) : "")} >
                        {type.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

FilterAwardToggle.propTypes = propTypes;
export default FilterAwardToggle;
