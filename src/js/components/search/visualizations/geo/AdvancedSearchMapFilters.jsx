/**
 * AdvancedSearchMapFilters.jsx
 * Created by Nick Torres 3/20/2024
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { mapFilterSortOrderByValue } from 'dataMapping/covid19/covid19';
import { handleSort } from 'helpers/covid19Helper';
import MapFiltersTitle from './MapFiltersTitle';
import NewPicker from '../../../sharedComponents/dropdowns/NewPicker';

const propTypes = {
    filters: PropTypes.object,
    activeFilters: PropTypes.object,
    isOpen: PropTypes.bool
};

const AdvancedSearchMapFilters = ({ filters, activeFilters, isOpen }) => (
    <div className={isOpen ? 'map__filters-container open' : 'map__filters-container closed'}>
        <div className="map__filters-header">
            <MapFiltersTitle />
        </div>
        <div className="map__filters-body">
            {
                Object.keys(filters).map((filter) => (
                    <div key={uniqueId()} className="map__filters-filter__container">
                        <div className="map__filters-wrapper">
                            <span className="map__filters-label">{filters[filter].label}</span>
                            <NewPicker
                                enabled={filters[filter].enabled}
                                size="sm"
                                classname="map__filters-button"
                                dropdownClassname="map__filters-dropdown"
                                sortFn={handleSort}
                                selectedOption={filters[filter].options.find((option) => option.value === activeFilters[filter]).label}
                                options={
                                    filters[filter].options.map((option) => ({
                                        name: option.label,
                                        value: option.value,
                                        onClick: filters[filter].onClick,
                                        sortOrder: mapFilterSortOrderByValue[option.value]
                                    }))
                                } />
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
);

AdvancedSearchMapFilters.propTypes = propTypes;
export default AdvancedSearchMapFilters;
