/**
 * StateProfileMapFilters.jsx
 * Created by Nick Torres 8/9/2024
 */

import React from 'react';
import PropTypes from 'prop-types';
import { cloneDeep, uniqueId } from 'lodash-es';
import { NewPicker } from "data-transparency-ui";

import { mapFilterSortOrderByValue } from 'dataMapping/state/stateMap';
import { handleSort } from 'helpers/covid19Helper';
import MapFiltersTitle from 'components/search/visualizations/geo/MapFiltersTitle';
import StateCFDAList from "./cfda/StateCFDAList";
import StateAgencyList from "./agency/StateAgencyList";
import ProgramActivityList from "./programActivity/ProgramActivityList";

const propTypes = {
    mapFilters: PropTypes.object,
    amountTypeEnabled: PropTypes.bool,
    activeFilters: PropTypes.object,
    isFiltersOpen: PropTypes.bool,
    awardTypeFilters: PropTypes.object,
    changeScope: PropTypes.func,
    clearSearchFilters: PropTypes.func,
    searchData: PropTypes.string,
    selectedItemsDisplayNames: PropTypes.object
};
// eslint-disable-next-line prefer-arrow-callback
const StateProfileMapFilters = React.memo(function StateProfileMapFilters({
    mapFilters,
    amountTypeEnabled,
    activeFilters,
    isFiltersOpen,
    awardTypeFilters,
    changeScope,
    clearSearchFilters,
    searchData,
    selectedItemsDisplayNames
}) {
    let tempMapFilters = mapFilters;
    let active = cloneDeep(activeFilters);

    if (!tempMapFilters || !activeFilters) return null;
    const awardTypeFiltersLocal = awardTypeFilters?.map((filter) => filter.internal)
        .filter((filter) => filter !== 'all')
        .filter((filter) => filter !== 'loans');

    if (awardTypeFiltersLocal?.includes(activeFilters.awardType)) {
        tempMapFilters.spendingType.options.pop();
    }

    if (activeFilters?.territory === 'country') {
        tempMapFilters = Object.assign({},
            {
                territory: tempMapFilters.territory,
                def_codes: tempMapFilters.def_codes,
                amountType: { ...tempMapFilters.amountType, enabled: false }
            });

        active = Object.assign({}, {
            ...active,
            amountType: 'totalSpending'
        });
    }
    else if (amountTypeEnabled === false) {
        tempMapFilters = Object.assign({},
            {
                territory: tempMapFilters.territory,
                def_codes: tempMapFilters.def_codes
            }
        );
    }
    else {
        tempMapFilters = Object.assign({},
            {
                territory: tempMapFilters.territory,
                def_codes: tempMapFilters.def_codes,
                amountType: { ...tempMapFilters.amountType, enabled: true }
            }
        );
    }

    const mapFilterClassName = isFiltersOpen ?
        'map__filters-container open' :
        'map__filters-container closed';

    return (
        <div className={mapFilterClassName}>
            <div className="map__filters-header">
                <MapFiltersTitle />
            </div>
            <div className="map__filters-body">
                {/* below chunk is for the dropdown filters */}
                {
                    Object.keys(tempMapFilters)
                        .map((filter) => {
                            let filterType = null;

                            if (tempMapFilters[filter].label.includes('DEFC')) {
                                filterType = 'defc';
                            }

                            if (tempMapFilters[filter].label.includes('Award Type')) {
                                filterType = 'awardType';
                            }

                            return (<>
                                <div key={uniqueId()} className="map__filters-filter__container">
                                    <div className="map__filters-wrapper">
                                        <span className="map__filters-label">
                                            {tempMapFilters[filter].label}
                                        </span>
                                        <NewPicker
                                            enabled={tempMapFilters[filter].enabled}
                                            size="sm"
                                            classname={`map__filters-button ${filterType}`}
                                            dropdownClassname="map__filters-dropdown"
                                            sortFn={handleSort}
                                            selectedOption={
                                                tempMapFilters[filter]
                                                    .options?.find(
                                                        (option) => option.value === active[filter]
                                                    )?.label
                                            }
                                            options={
                                                tempMapFilters[filter].options?.map((option) => ({
                                                    name: option.label,
                                                    value: option.value,
                                                    onClick: tempMapFilters[filter].onClick,
                                                    sortOrder: mapFilterSortOrderByValue[option.value]
                                                }))
                                            } />
                                    </div>
                                </div>
                            </>);
                        })
                }
                {/* below chunk is for the autocomplete filters */}
                <div key={uniqueId()} className="map__filters-filter__container">
                    <div className="map__filters-wrapper">
                        <div className="filter-item-wrap" key="holder-awarding">
                            <StateAgencyList
                                searchData={searchData}
                                changeScope={changeScope}
                                clearSearchFilters={clearSearchFilters}
                                selectedItemsDisplayNames={selectedItemsDisplayNames} />
                        </div>
                    </div>
                    <div key={uniqueId()} className="map__filters-filter__container">
                        <div className="map__filters-wrapper">
                            <ProgramActivityList
                                searchData={searchData}
                                changeScope={changeScope}
                                clearSearchFilters={clearSearchFilters}
                                selectedItemsDisplayNames={selectedItemsDisplayNames} />
                        </div>
                    </div>
                    <div key={uniqueId()} className="map__filters-filter__container">
                        <div className="map__filters-wrapper">
                            <StateCFDAList
                                changeScope={changeScope}
                                clearSearchFilters={clearSearchFilters}
                                searchData={searchData}
                                selectedItemsDisplayNames={selectedItemsDisplayNames}
                                placeholder="Search for an assistance listing..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

StateProfileMapFilters.propTypes = propTypes;
export default StateProfileMapFilters;
