/**
 * SubawardDropdown.jsx
 * Created by Nick Torres 2/26/2024
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import { NewPicker } from 'data-transparency-ui';

import Analytics from 'helpers/analytics/Analytics';


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
    // infoSection = false,
    infoSectionContent = ''
}) => {
    const [selected, setSelected] = useState(selectedValue);
    const dispatch = useDispatch();

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

    // TODO: replace legacyOptions with v20ptions once ready to release transactions
    // const v2Options =
    //     [
    //         {
    //             name: 'Prime Awards',
    //             value: 'awards',
    //             onClick
    //         },
    //         {
    //             name: 'Subawards',
    //             value: 'subawards',
    //             onClick
    //         },
    //         {
    //             name: 'Transactions',
    //             value: 'transactions',
    //             onClick
    //         }
    //     ];

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

    const sortFn = () => legacyOptions;

    return (
        <div className="subaward-dropdown__container">
            <NewPicker
                enabled={enabled}
                leftIcon={faFunnelDollar}
                size="sm"
                label="Filter by:"
                options={legacyOptions}
                classname="subaward-dropdown__wrapper"
                minTextWidth="subaward-dropdown__textMinWidth"
                dropdownClassname="subaward-dropdown__list"
                buttonClassname="subaward-dropdown__button"
                selectedOption={legacyOptions?.length
                    ? legacyOptions.find((obj) => obj.value === selected)?.name
                    : `${selected}`
                }
                sortFn={sortFn}
                // TODO: add infoSection back in once ready to release transactions
                // infoSection={infoSection}
                infoSectionContent={infoSectionContent} />

        </div>
    );
};

SubawardDropdown.propTypes = propTypes;
export default SubawardDropdown;
