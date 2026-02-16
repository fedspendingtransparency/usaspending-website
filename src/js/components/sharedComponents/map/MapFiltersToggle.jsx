/**
 * MapFiltersToggle.jsx
 * Created by Jonathan Hill 07/06/20
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    isFiltersOpen: PropTypes.bool,
    setIsFiltersOpen: PropTypes.func
};

// eslint-disable-next-line prefer-arrow-callback
const MapFiltersToggle = memo(function MapFiltersToggle({ isFiltersOpen, setIsFiltersOpen }) {
    const onToggle = () => setIsFiltersOpen(!isFiltersOpen);
    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            setIsFiltersOpen(!isFiltersOpen);
        }
    };

    const className = isFiltersOpen ? 'map__filters-toggle open' : 'map__filters-toggle closed';
    const ariaLabel = `${isFiltersOpen ? 'Close' : 'Open'} map filters`;
    const icon = isFiltersOpen ? 'caret-left' : 'caret-right';

    return (
        <div
            onClick={onToggle}
            onKeyDown={onKeyDown}
            className={className}
            aria-label={ariaLabel}
            role="button"
            tabIndex={0} >
            <FontAwesomeIcon icon={icon} />
        </div>
    );
});

MapFiltersToggle.propTypes = propTypes;
export default MapFiltersToggle;
