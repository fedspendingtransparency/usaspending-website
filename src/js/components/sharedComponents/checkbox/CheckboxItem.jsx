import React, { useRef } from "react";
import { uniqueId } from "lodash-es";
import PropTypes from "prop-types";

import replaceString from "../../../helpers/replaceString";
import useEventListener from "../../../hooks/useEventListener";

// sub-filters hidden from the user, but  passed to the API when the parent filter is selected
const excludedSubFilters = "IDV_B";

const propTypes = {
    filter: PropTypes.string,
    selectedFilters: PropTypes.array,
    label: PropTypes.string,
    customLabel: PropTypes.string,
    searchString: PropTypes.string,
    singleFilterChange: PropTypes.func
};

const CheckboxItem = ({
    filter,
    selectedFilters,
    label,
    customLabel,
    searchString,
    singleFilterChange
}) => {
    const inputRef = useRef(null);
    const highlightText = (text) => replaceString(text, searchString, 'highlight');

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
        <li className={`checkbox-filter__item ${filter === excludedSubFilters ? 'hidden' : ''}`}>
            <input
                type="checkbox"
                id={`primary-checkbox-${uniqueId()}`}
                value={filter}
                checked={selectedFilters?.has(filter)}
                onChange={toggleFilter}
                ref={inputRef} />
            {customLabel ?
                <div className="checkbox-filter__item-label">{highlightText(customLabel)}</div>
                :
                <div className="checkbox-filter__item-label">{highlightText(label)}</div>
            }
        </li>
    );
};

CheckboxItem.propTypes = propTypes;
export default CheckboxItem;
