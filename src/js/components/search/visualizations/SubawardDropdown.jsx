/**
 * SubawardDropdown.jsx
 * Created by Nick Torres 2/26/2024
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    subaward = false,
    setSearchViewSubaward
}) => {
    const [selected, setSelected] = useState(selectedValue);
    const onClick = (e) => {
        setSearchViewSubaward(e === 'subaward');
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
    console.debug(options.find((obj) => obj.value === selected).name);
    return (
        <div className="subaward-dropdown__container">
            <NewPicker
                enabled
                leftIcon={faFunnelDollar}
                size="sm"
                label="Filter by:"
                options={renderOptions()}
                className="subaward-toggle__wrapper"
                dropdownClassName="subaward-toggle__dropdown"
                selectedOption={options.length
                    ? options.find((obj) => obj.value === selected).name
                    : `${selected}`
                } />
        </div>
    );
};
/*
        <button
            tabIndex="0"
            className="subaward-toggle"
            onClick={this.toggledSwitch}
            aria-pressed={!this.props.subaward}
            aria-label={`Toggle between Prime Awards and Sub-Award. Currently selected: ${currentSelection}`}>
            <div className={`subaward-toggle__label ${primeActive}`}>
                Prime Awards
            </div>
            <svg
                className="subaward-toggle__switch subaward-switch"
                width="45"
                height="24">
                <g
                    className="subaward-switch__graphic"
                    transform="translate(4 2)">
                    <rect
                        className="subaward-switch__track"
                        width="40"
                        height="20"
                        rx="10"
                        ry="10" />
                    <g
                        className="subaward-switch__switch"
                        transform={switchPosition}>
                        <circle
                            className="subaward-switch__switch-fill"
                            cy="10"
                            r="10" />
                    </g>
                </g>
            </svg>
            <div className={`subaward-toggle__label ${subActive}`}>
                Sub-Awards
            </div>
        </button>


        {options.length
                    ? options.find((obj) => obj.value === selectedValue).name
                    : `${selectedValue}`
                }
*/
SubawardDropdown.propTypes = propTypes;
export default SubawardDropdown;
