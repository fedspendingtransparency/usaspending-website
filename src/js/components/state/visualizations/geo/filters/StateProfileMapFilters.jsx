/**
 * StateProfileMapFilters.jsx
 * Created by Nick Torres 8/9/2024
 */

import React from 'react';
import PropTypes from 'prop-types';

import MapFiltersTitle from 'components/search/visualizations/geo/MapFiltersTitle';
import StateMapFiltersAutocomplete from "./StateMapFiltersAutocomplete";
import StateMapFiltersDropdown from "./StateMapFiltersDropdown";

const propTypes = {
    activeFilters: PropTypes.object,
    isFiltersOpen: PropTypes.bool,
    changeScope: PropTypes.func,
    clearSearchFilters: PropTypes.func,
    searchData: PropTypes.string,
    selectedItemsDisplayNames: PropTypes.object,
    changeMapLayer: PropTypes.func
};
// eslint-disable-next-line prefer-arrow-callback
const StateProfileMapFilters = React.memo(function StateProfileMapFilters({
    activeFilters,
    isFiltersOpen,
    changeScope,
    clearSearchFilters,
    searchData,
    selectedItemsDisplayNames,
    changeMapLayer
}) {
    const mapFilterClassName = isFiltersOpen ?
        'map__filters-container open' :
        'map__filters-container closed';

    return (
        <div className={mapFilterClassName}>
            <div className="map__filters-header">
                <MapFiltersTitle />
            </div>
            <div className="map__filters-body">
                <StateMapFiltersDropdown
                    activeFilters={activeFilters}
                    changeScope={changeScope}
                    clearSearchFilters={clearSearchFilters}
                    changeMapLayer={changeMapLayer} />
                <StateMapFiltersAutocomplete
                    searchData={searchData}
                    changeScope={changeScope}
                    clearSearchFilters={clearSearchFilters}
                    selectedItemsDisplayNames={selectedItemsDisplayNames} />
            </div>
        </div>
    );
});

StateProfileMapFilters.propTypes = propTypes;
export default StateProfileMapFilters;
