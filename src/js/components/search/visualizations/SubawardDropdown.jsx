/**
 * SubawardDropdown.jsx
 * Created by Nick Torres 2/26/2024
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import Analytics from 'helpers/analytics/Analytics';
import NewPicker from "../../sharedComponents/dropdowns/NewPicker";

const propTypes = {
    size: PropTypes.string,
    leftIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    enabled: PropTypes.bool,
    subaward: PropTypes.bool,
    setSearchViewSubaward: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })),
    selectedValue: PropTypes.string
};

const SubawardDropdown = ({
    selectedValue = 'prime',
    options = [],
    setSearchViewSubaward
}) => {
    const [selected, setSelected] = useState(selectedValue);
    const dispatch = useDispatch();
    const onClick = (e) => {
        dispatch(setSearchViewSubaward(e === 'subaward'));
        setSelected(e === 'prime' ? 'prime' : 'subaward');
        if (e === 'subaward') {
            Analytics.event({
                event: 'search_subaward_dropdown',
                category: 'Advanced Search - Search Fields',
                action: 'Subawards Search',
                gtm: true
            });
        }
    };

    const renderOptions = () =>
        [
            {
                name: 'Prime Awards and Transactions',
                value: 'prime',
                onClick
            },
            {
                name: 'Subawards',
                value: 'subaward',
                onClick
            }
        ];

    // eslint-disable-next-line no-param-reassign
    options = renderOptions();
    const sortFn = () => options;
    return (
        <div className="subaward-dropdown__container">
            <NewPicker
                enabled
                leftIcon={faFunnelDollar}
                size="sm"
                label="Filter by:"
                options={renderOptions()}
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
