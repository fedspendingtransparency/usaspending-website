import React, { useRef } from "react";
import { uniqueId } from "lodash-es";
import PropTypes from "prop-types";

import useEventListener from "../../../hooks/useEventListener";
import replaceString from "../../../helpers/replaceString";

const propTypes = {
    filter: PropTypes.string,
    label: PropTypes.string,
    selectedFilters: PropTypes.array,
    searchString: PropTypes.string,
    singleFilterChange: PropTypes.func
};

const ListCheckboxPrimaryItem = ({
    filter,
    selectedFilters,
    singleFilterChange,
    label,
    searchString
}) => {
    const inputRef = useRef(null);
    const toggleFilter = (e) => {
        if (e.type === 'change' || e?.key === 'Enter') {
            const selection = {
                value: filter
            };

            singleFilterChange(selection);
        }
    };

    useEventListener('keydown', toggleFilter, inputRef);

    return (
        <li className="checkbox-filter__item" key={label}>
            <input
                type="checkbox"
                id={`primary-checkbox-${uniqueId()}`}
                value={filter}
                checked={selectedFilters?.has(filter)}
                onChange={toggleFilter}
                ref={inputRef} />
            <div className="checkbox-filter__item-label">
                {replaceString(label, searchString, 'highlight')}
            </div>
        </li>
    );
};

ListCheckboxPrimaryItem.propTypes = propTypes;
export default ListCheckboxPrimaryItem;
