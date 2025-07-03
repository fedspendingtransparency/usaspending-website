/**
 * MobileSort.jsx
 * Created by Nick Torres 6/26/2025
 */

import React from 'react';
import PropTypes from "prop-types";
import { NewPicker } from "data-transparency-ui";
import MobileSortDirectionToggle from './MobileSortDirectionToggle';

const propTypes = {
    setActiveField: PropTypes.func,
    sortBy: PropTypes.func,
    sort: PropTypes.object,
    setSort: PropTypes.func,
    columns: PropTypes.array,
    sortDirection: PropTypes.string,
    tableColumns: PropTypes.object,
    setSortDirection: PropTypes.func,
    activeField: PropTypes.string
};

const MobileSort = (props) => {
    const mobileDropdownOptions = [];
    const onClick = (e) => {
        if (props?.setActiveField && props?.sortBy) {
            props.setActiveField(e);
            props.sortBy(e, props.sortDirection);
        }
        else if (props?.sort && props?.setSort) {
            // eslint-disable-next-line react/prop-types
            props.setSort({ field: e, direction: props?.sort?.direction });
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
    else if (props.tableColumns) {
        const result = Object.values(props.tableColumns).map((value) => value);
        // eslint-disable-next-line array-callback-return
        result.map((column) => {
            const option = {
                name: column.displayName,
                value: column.columnName,
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
                    // eslint-disable-next-line max-len, react/prop-types
                    ? mobileDropdownOptions?.find((obj) => obj.value === props?.activeField || obj.value === props?.sort?.field)?.name
                    : `${props?.activeField || props.sort?.field}`}
                size="sm"
                label="Sort by:"
                enabled
                sortFn={() => mobileDropdownOptions}
                classname="mobile-sort__picker" />
            <MobileSortDirectionToggle
                sortDirection={props.sortDirection}
                setSortDirection={props.setSortDirection}
                sortBy={props.sortBy}
                activeField={props?.activeField}
                sort={props?.sort}
                setSort={props?.setSort} />
        </div>
    );
};

MobileSort.propTypes = propTypes;
export default MobileSort;
