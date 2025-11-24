import React, { useRef } from "react";
import { uniqueId } from "lodash-es";
import PropTypes from "prop-types";

import useEventListener from "../../../../hooks/useEventListener";

const propTypes = {
    filter: PropTypes.string,
    selectedFilters: PropTypes.bool,
    label: PropTypes.string,
    customLabel: PropTypes.string,
    searchString: PropTypes.string,
    singleFilterChange: PropTypes.func
};

const AllForgeinLocationButton = ({
    filter,
    isForeign,
    setIsForeign
}) => {
    const inputRef = useRef(null);

    const toggleFilter = (e) => {
        e.stopPropagation();
        if (e.type === 'change' || e?.key === 'Enter') {
            setIsForeign(!isForeign);
        }
    };

    useEventListener('keydown', toggleFilter, inputRef);

    return (
        <>
            <input
                type="checkbox"
                id={`primary-checkbox-${uniqueId()}`}
                value={filter}
                checked={isForeign}
                onChange={toggleFilter}
                ref={inputRef} />
            <div className="checkbox-filter__item-label">All foreign locations</div>
        </>
    );
};

AllForgeinLocationButton.propTypes = propTypes;
export default AllForgeinLocationButton;
