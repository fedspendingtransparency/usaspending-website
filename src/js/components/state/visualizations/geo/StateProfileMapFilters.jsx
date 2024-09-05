/**
 * StateProfileMapFilters.jsx
 * Created by Nick Torres 8/9/2024
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import { mapFilterSortOrderByValue } from '../../../../dataMapping/state/stateMap';
import { handleSort } from '../../../../helpers/covid19Helper';
import MapFiltersTitle from '../../../search/visualizations/geo/MapFiltersTitle';
import NewPicker from '../../../sharedComponents/dropdowns/NewPicker';
import StateCFDAList from "./cfda/StateCFDAList";
import StateAgencyList from "./agency/StateAgencyList";

const propTypes = {
    filters: PropTypes.object,
    activeFilters: PropTypes.object,
    isOpen: PropTypes.bool
};

const StateProfileMapFilters = React.memo((props) => {
    // console.log(props.filters);

    return (
        <div className={props.isOpen ? 'map__filters-container open' : 'map__filters-container closed'}>
            <div className="map__filters-header">
                <MapFiltersTitle />
            </div>
            <div className="map__filters-body">
                {/* below chunk is for the dropdown filters */}
                {
                    Object.keys(props.filters).map((filter) => (
                        <>
                            <div key={uniqueId()} className="map__filters-filter__container">
                                <div className="map__filters-wrapper">
                                    <span className="map__filters-label">{props.filters[filter].label}</span>
                                    <NewPicker
                                        enabled={props.filters[filter].enabled}
                                        size="sm"
                                        classname="map__filters-button"
                                        dropdownClassname="map__filters-dropdown"
                                        sortFn={handleSort}
                                        selectedOption={props.filters[filter].options?.find((option) => option.value === props.activeFilters[filter])?.label}
                                        options={
                                            props.filters[filter].options?.map((option) => ({
                                                name: option.label,
                                                value: option.value,
                                                onClick: props.filters[filter].onClick,
                                                sortOrder: mapFilterSortOrderByValue[option.value]
                                            }))
                                        } />
                                </div>
                            </div>
                        </>
                    ))
                }
                {/* below chunk is for the autocomplete filters */}
                <div key={uniqueId()} className="map__filters-filter__container">
                    <div className="map__filters-wrapper">
                        <div className="filter-item-wrap" key="holder-awarding">
                            <StateAgencyList
                                {...props}
                                agencyType="awarding"
                                placeholder="Search for an Awarding Agency..." />
                        </div>
                    </div>
                    <div key={uniqueId()} className="map__filters-filter__container">
                        <div className="map__filters-wrapper">
                            <StateCFDAList
                                {...props}
                                placeholder="Search for an Assistance Listing..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>);
});
StateProfileMapFilters.propTypes = propTypes;
export default StateProfileMapFilters;
