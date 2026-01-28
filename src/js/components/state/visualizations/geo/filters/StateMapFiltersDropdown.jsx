import React, { useCallback, useEffect, useState } from "react";
import { uniqueId } from "lodash-es";
import { NewPicker } from "data-transparency-ui";
import PropTypes from "prop-types";

import { handleSort } from "helpers/covid19Helper";
import {
    awardTypeTabs,
    filtersOnClickHandler,
    mapFilterSortOrderByValue,
    stateFilters
} from "dataMapping/state/stateMap";
import { useDefCodes } from "containers/covid19/WithDefCodes";

const awardTypeFilters = awardTypeTabs.map((filter) => filter.internal)
    .filter((filter) => filter !== 'all')
    .filter((filter) => filter !== 'loans');

const propTypes = {
    activeFilters: PropTypes.object,
    changeScope: PropTypes.func,
    clearSearchFilters: PropTypes.func,
    changeMapLayer: PropTypes.func
};

const StateMapFiltersDropdown = ({
    activeFilters, changeScope, clearSearchFilters, changeMapLayer
}) => {
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
    const addOnClickToFilters = () => Object.keys(stateFilters).reduce((acc, filter) => {
        acc[filter] = {
            ...stateFilters[filter],
            onClick: filtersOnClickHandler[filter] === 'updateTerritoryFilter' ?
                changeMapLayer :
                updateDefcFilter
        };
        return acc;
    }, {});

    const [mapFilters, setMapFilters] = useState(addOnClickToFilters());
    const [, , defCodes] = useDefCodes();

    const parseDefCodes = useCallback((codes, filters) => {
        const defCodeOptionsList = codes.map((code) => ({
            label: `${code.code} - ${code.title}`,
            value: code.code
        }));

        // Move DEFC 1 to the end of the list
        const firstElement = defCodeOptionsList.shift();
        defCodeOptionsList.push(firstElement);

        const tempMapFilters = filters;

        if (tempMapFilters.def_codes.options.length === 1) {
            tempMapFilters.def_codes.options.push(...defCodeOptionsList);
            setMapFilters(tempMapFilters);
        }
    }, []);

    useEffect(() => {
        if (defCodes.length > 0) {
            parseDefCodes(defCodes, mapFilters);
        }
    }, [defCodes, parseDefCodes, mapFilters]);

    if (!activeFilters) return null;

    let tempMapFilters = mapFilters;

    if (awardTypeFilters?.includes(activeFilters.awardType)) {
        tempMapFilters.spendingType.options.pop();
    }

    tempMapFilters = Object.assign({},
        {
            territory: tempMapFilters.territory,
            def_codes: tempMapFilters.def_codes
        }
    );

    return (
        <>
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
                                                    (option) =>
                                                        option.value === activeFilters[filter]
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
        </>
    );
};

StateMapFiltersDropdown.propTypes = propTypes;
export default StateMapFiltersDropdown;
