import React from "react";
import { uniqueId } from "lodash-es";
import { NewPicker } from "data-transparency-ui";
import PropTypes from "prop-types";

import { handleSort } from "helpers/covid19Helper";
import {
    filtersOnClickHandler,
    mapFilterSortOrderByValue,
    stateFilters
} from "dataMapping/state/stateMap";
import { useDefCodes } from "hooks/WithDefCodes";

const propTypes = {
    activeFilters: PropTypes.object,
    changeScope: PropTypes.func,
    clearSearchFilters: PropTypes.func,
    changeMapLayer: PropTypes.func
};

const StateMapFiltersDropdown = ({
    activeFilters, changeScope, clearSearchFilters, changeMapLayer
}) => {
    const [, , defCodes] = useDefCodes();

    const updateDefcFilter = (value) => {
        if (value === "all") {
            clearSearchFilters("def_code");
        }
        else {
            changeScope(
                { filters: { def_codes: [value] } },
                "def_code",
                [value]
            );
        }
    };

    // this will need to be updated as more filters are added
    const mapFilters = Object.keys(stateFilters).reduce((acc, filter) => {
        acc[filter] = {
            ...stateFilters[filter],
            onClick: filtersOnClickHandler[filter] === 'updateTerritoryFilter' ?
                changeMapLayer :
                updateDefcFilter
        };
        return acc;
    }, {});

    if (mapFilters.def_codes.options.length === 1) {
        const defCodeOptionsList = defCodes.map((code) => ({
            label: `${code.code} - ${code.title}`,
            value: code.code
        }));

        mapFilters.def_codes.options.push(...defCodeOptionsList);
    }

    if (!activeFilters) return null;

    return (
        <>
            {
                Object.keys(mapFilters)
                    .map((filter) => {
                        const filterType = mapFilters[filter].label.includes('DEFC') ?
                            'defc' :
                            null;

                        const selectedOption = mapFilters[filter]
                            .options?.find(
                                (option) =>
                                    option.value === activeFilters[filter]
                            )?.label;

                        const options = mapFilters[filter].options?.map((option) => ({
                            name: option.label,
                            value: option.value,
                            onClick: mapFilters[filter].onClick,
                            sortOrder: mapFilterSortOrderByValue[option.value]
                        }));

                        return (<>
                            <div key={uniqueId()} className="map__filters-filter__container">
                                <div className="map__filters-wrapper">
                                    <span className="map__filters-label">
                                        {mapFilters[filter].label}
                                    </span>
                                    <NewPicker
                                        enabled={mapFilters[filter].enabled}
                                        size="sm"
                                        classname={`map__filters-button ${filterType}`}
                                        dropdownClassname="map__filters-dropdown"
                                        sortFn={handleSort}
                                        selectedOption={selectedOption}
                                        options={options} />
                                </div>
                            </div>
                        </>);
                    })
            }
        </>
    );
};

StateMapFiltersDropdown.propTypes = propTypes;
export default StateMapFiltersDropdown;
