/**
 * SubawardToggle.jsx
 * Created by JD House 01/2026
 */

import React, { useState, useCallback, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSearchParams } from "react-router";
import Analytics from 'helpers/analytics/Analytics';
import { setSearchViewSubaward, setSpendingLevel } from "redux/actions/search/searchViewActions";

const propTypes = {
    selectedValue: PropTypes.string,
    label: PropTypes.string,
    queryParam: PropTypes.object
};

// eslint-disable-next-line prefer-arrow-callback
const FilterAwardToggle = memo(function FilterAwardToggle({
    selectedValue = 'awards',
    label = "View By",
    queryParam
}) {
    const [selected, setSelected] = useState(selectedValue);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.location.href.includes("subawards") || queryParam) {
            setSelected("subawards");
            dispatch(setSearchViewSubaward("subawards"));
            dispatch(setSpendingLevel("subawards"));

            if (queryParam) {
                setSearchParams(queryParam);
            }
        }
        else if (!queryParam && selected === "subawards") {
            setSelected("awards");
            dispatch(setSearchViewSubaward("awards"));
            dispatch(setSpendingLevel("awards"));
        }
    }, [dispatch, queryParam, setSearchParams]);

    const onToggle = useCallback((type) => {
        dispatch(setSearchViewSubaward(type === 'subawards'));
        dispatch(setSpendingLevel(type));
        setSelected(type);

        if (type === 'subawards') {
            if (!window.location.href.includes("subawards")) {
                searchParams.append("subawards", "true");
                setSearchParams(searchParams);
            }
            else {
                // do nothing, subawards in url and setting to subawards
            }

            Analytics.event({
                event: 'search_subaward_dropdown',
                category: 'Advanced Search - Search Fields',
                action: 'Subawards Search',
                gtm: true
            });
        }
        else if (window.location.href.includes("subawards")) {
            searchParams.delete("subawards");
            setSearchParams(searchParams);
        }
    }, [dispatch, searchParams, setSearchParams]);

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
                        className={`filter-award-toggle__button ${
                            selected === type.value ? "active" : ""
                        }`}
                        tabIndex="0"
                        onClick={() => onToggle(type.value)}
                        onKeyDown={(e) => (e.key === "Enter" ? onToggle(type.value) : "")} >
                        {type.name}
                    </button>
                ))}
            </div>
        </div>
    );
});

FilterAwardToggle.propTypes = propTypes;
export default FilterAwardToggle;
