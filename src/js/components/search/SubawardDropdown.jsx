/**
 * SubawardDropdown.jsx
 * Created by Nick Torres 2/26/2024
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import Analytics from 'helpers/analytics/Analytics';
import NewPicker from "../sharedComponents/dropdowns/NewPicker";

const propTypes = {
    enabled: PropTypes.bool,
    setSearchViewSubaward: PropTypes.func,
    selectedValue: PropTypes.string,
    setSpendingLevel: PropTypes.func
};

const SubawardDropdown = ({
    selectedValue = 'awards',
    setSearchViewSubaward,
    enabled = 'false',
    setSpendingLevel
}) => {
    const [selected, setSelected] = useState(selectedValue);
    const dispatch = useDispatch();
    const onClick = (e) => {
        dispatch(setSearchViewSubaward(e === 'subaward'));
        dispatch(setSpendingLevel(e));

        setSelected(e === 'awards' ? 'awards' : 'subaward');
        if (e === 'subaward') {
            Analytics.event({
                event: 'search_subaward_dropdown',
                category: 'Advanced Search - Search Fields',
                action: 'Subawards Search',
                gtm: true
            });
        }
    };

    const options =
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

    const sortFn = () => options;
    return (
        <div className="subaward-dropdown__container">
            <NewPicker
                enabled={enabled}
                leftIcon={faFunnelDollar}
                size="sm"
                label="Filter by:"
                options={options}
                classname="subaward-dropdown__wrapper"
                minTextWidth="subaward-dropdown__textMinWidth"
                dropdownClassname="subaward-dropdown__list"
                buttonClassname="subaward-dropdown__button"
                selectedOption={options.length
                    ? options.find((obj) => obj.value === selected).name
                    : `${selected}`
                }
                sortFn={sortFn} />
        </div>
    );
};

SubawardDropdown.propTypes = propTypes;
export default SubawardDropdown;
