import React, { useRef } from "react";
import PropTypes from "prop-types";

import useEventListener from "../../../../hooks/useEventListener";

const propTypes = {
    filter: PropTypes.string,
    isForeign: PropTypes.bool,
    setIsForeign: PropTypes.func,
    disabled: PropTypes.bool
};

const AllForeignLocationsCheckbox = ({
    filter,
    isForeign,
    setIsForeign,
    disabled
}) => {
    const labelClass = disabled ? 'disabled' : '';
    const inputRef = useRef(null);

    const toggleFilter = (e) => {
        e.stopPropagation();
        if (e.type === 'change' || e?.key === 'Enter') {
            setIsForeign();
        }
    };

    useEventListener('keydown', toggleFilter, inputRef);

    return (
        <div className="location-checkbox">
            <input
                type="checkbox"
                id="location-checkbox__checkbox"
                value={filter}
                checked={isForeign}
                onChange={toggleFilter}
                ref={inputRef}
                disabled={disabled} />
            <div className={`location-checkbox__label ${labelClass}`}>
                All foreign locations
            </div>
        </div>
    );
};

AllForeignLocationsCheckbox.propTypes = propTypes;
export default AllForeignLocationsCheckbox;
