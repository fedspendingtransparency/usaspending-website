/**
 * SubawardDropdown.jsx
 * Created by Nick Torres 2/26/2024
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import GlobalConstants from 'GlobalConstants';
import { faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import Analytics from 'helpers/analytics/Analytics';
import NewPicker from "../sharedComponents/dropdowns/NewPicker";


const propTypes = {
    enabled: PropTypes.bool,
    setSearchViewSubaward: PropTypes.func,
    selectedValue: PropTypes.string,
    setSpendingLevel: PropTypes.func,
    infoSection: PropTypes.bool,
    infoSectionContent: PropTypes.string
};

const SubawardDropdown = ({
    selectedValue = 'awards',
    setSearchViewSubaward,
    enabled = 'false',
    setSpendingLevel,
    infoSection = false,
    infoSectionContent = ''
}) => {
    const [selected, setSelected] = useState(selectedValue);
    const [v2, setv2] = useState();
    const [optionsList, setOptionsList] = useState();

    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const onClick = (e) => {
        dispatch(setSearchViewSubaward(e === 'subawards'));
        dispatch(setSpendingLevel(e));
        setSelected(e);

        if (e === 'subawards') {
            Analytics.event({
                event: 'search_subaward_dropdown',
                category: 'Advanced Search - Search Fields',
                action: 'Subawards Search',
                gtm: true
            });
        }
    };

    const v2Options =
        [
            {
                name: 'Prime Awards',
                value: 'awards',
                onClick
            },
            {
                name: 'Subawards',
                value: 'subawards',
                onClick
            },
            {
                name: 'Transactions',
                value: 'transactions',
                onClick
            }
        ];

    const legacyOptions =
        [
            {
                name: 'Prime Awards and Transactions',
                value: 'awards',
                onClick
            },
            {
                name: 'Subawards',
                value: 'subawards',
                onClick
            }
        ];

    const sortFn = () => optionsList;

    useEffect(() => {
        const isv2 = pathname === GlobalConstants.SEARCH_V2_PATH;
        setv2(isv2);

        setOptionsList(isv2 ? v2Options : legacyOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="subaward-dropdown__container">
            <NewPicker
                enabled={enabled}
                leftIcon={faFunnelDollar}
                size="sm"
                label="Filter by:"
                options={optionsList}
                classname="subaward-dropdown__wrapper"
                minTextWidth="subaward-dropdown__textMinWidth"
                dropdownClassname="subaward-dropdown__list"
                buttonClassname="subaward-dropdown__button"
                selectedOption={optionsList?.length
                    ? optionsList.find((obj) => obj.value === selected)?.name
                    : `${selected}`
                }
                sortFn={sortFn}
                infoSection={v2 ? infoSection : false}
                infoSectionContent={infoSectionContent} />

        </div>
    );
};

SubawardDropdown.propTypes = propTypes;
export default SubawardDropdown;
