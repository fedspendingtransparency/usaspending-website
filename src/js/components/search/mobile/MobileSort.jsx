/**
 * MobileSort.jsx
 * Created by Nick Torres 6/26/2025
 */

import React from 'react';
import PropTypes from "prop-types";
import { NewPicker } from "data-transparency-ui";
import MobileSortDirectionToggle from './MobileSortDirectionToggle';

const MobileSort = (props) => {
    const mobileDropdownOptions = [];
    const onClick = (e) => {
        if (props?.setActiveField && props?.sortBy) {
            props.setActiveField(e);
            props.sortBy(e, props.sortDirection);
        }
        else if (props?.sort && props?.setSort) {
            props.setSort({ field: e, direction: props.sort.direction });
        }
    };
    if (props.columns) {
    // eslint-disable-next-line array-callback-return
        props.columns.map((column) => {
            const option = {
                name: column.displayName[0],
                value: column.title,
                onClick
            };
            mobileDropdownOptions.push(option);
        });
    }
    return (
        <div className="mobile__sort">
            <NewPicker
                options={mobileDropdownOptions}
                leftIcon=""
                selectedOption={mobileDropdownOptions?.length
                    ? mobileDropdownOptions?.find((obj) => obj.value === props.activeField)?.name
                    : `${props.activeField}`}
                size="sm"
                label="Sort by:"
                enabled
                sortFn={() => mobileDropdownOptions}
                classname="mobile-sort__picker" />
            <MobileSortDirectionToggle
                sortDirection={props.sortDirection}
                setSortDirection={props.setSortDirection}
                sortBy={props.sortBy}
                activeField={props.activeField} />
        </div>
    );
};

// MobileSort.propTypes = propTypes;
export default MobileSort;
