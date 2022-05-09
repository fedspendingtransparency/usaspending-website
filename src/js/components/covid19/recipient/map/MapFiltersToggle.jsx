/**
 * MapFiltersToggle.jsx
 * Created by Jonathan Hill 07/06/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createOnKeyDownHandler } from 'helpers/keyboardEventsHelper';

const propTypes = {
    isOpen: PropTypes.bool,
    onClick: PropTypes.func
};

const MapFiltersToggle = ({ isOpen, onClick }) => {
    const onKeyDown = () => createOnKeyDownHandler(onClick);

    return (
        <div
            role="button"
            onKeyDown={onKeyDown}
            tabIndex={0}
            onClick={onClick}
            className={isOpen ? 'map__filters-toggle open' : 'map__filters-toggle closed'}
            aria-label={`${isOpen ? 'Close' : 'Open'} map filters`} >
            <FontAwesomeIcon icon={isOpen ? 'caret-left' : 'caret-right'} />
        </div>
    );
};

MapFiltersToggle.propTypes = propTypes;
export default MapFiltersToggle;
