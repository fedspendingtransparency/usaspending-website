/**
 * MapFilters.jsx
 * Created by Jonathan Hill 06/09/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { Picker } from 'data-transparency-ui';
import MapFiltersHeader from './MapFiltersHeader';

const propTypes = {
    filters: PropTypes.object,
    activeFilters: PropTypes.object
};

const MapFilters = ({ filters, activeFilters }) => {
    return (
        <div className="map__filters-container">
            <div className="map__filters-header">
                <MapFiltersHeader />
            </div>
            <div className="map__filters-body">
                {
                    Object.keys(filters).map((filter) => (
                        <div key={uniqueId()} className="map__filters-filter__container">
                            <div className="map__filters-label">
                                {filters[filter].label}
                            </div>
                            <Picker
                                selectedOption={filters[filter].options.find((option) => option.value === activeFilters[filter]).label}
                                options={
                                    filters[filter].options.map((option) => ({ name: option.label, value: option.value, onClick: filters[filter].onClick }))
                                } />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

MapFilters.propTypes = propTypes;
export default MapFilters;
