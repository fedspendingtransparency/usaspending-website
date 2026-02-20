import React from "react";
import { uniqueId } from "lodash-es";
import PropTypes from "prop-types";

import StateAgencyList from "./StateAgencyList";
import ProgramActivityList from "./ProgramActivityList";
import StateCFDAList from "./StateCFDAList";

const propTypes = {
    searchParams: PropTypes.string,
    changeScope: PropTypes.func,
    clearSearchFilters: PropTypes.func,
    selectedItemsDisplayNames: PropTypes.object
};

const StateMapFiltersAutocomplete = ({
    searchParams, changeScope, clearSearchFilters, selectedItemsDisplayNames
}) => (
    <div key={uniqueId()} className="map__filters-filter__container">
        <div className="map__filters-wrapper">
            <div className="filter-item-wrap" key="holder-awarding">
                <StateAgencyList
                    searchParams={searchParams}
                    changeScope={changeScope}
                    clearSearchFilters={clearSearchFilters}
                    selectedItemsDisplayNames={selectedItemsDisplayNames} />
            </div>
        </div>
        <div key={uniqueId()} className="map__filters-filter__container">
            <div className="map__filters-wrapper">
                <ProgramActivityList
                    searchParams={searchParams}
                    changeScope={changeScope}
                    clearSearchFilters={clearSearchFilters}
                    selectedItemsDisplayNames={selectedItemsDisplayNames} />
            </div>
        </div>
        <div key={uniqueId()} className="map__filters-filter__container">
            <div className="map__filters-wrapper">
                <StateCFDAList
                    searchParams={searchParams}
                    changeScope={changeScope}
                    clearSearchFilters={clearSearchFilters}
                    selectedItemsDisplayNames={selectedItemsDisplayNames} />
            </div>
        </div>
    </div>
);

StateMapFiltersAutocomplete.propTypes = propTypes;
export default StateMapFiltersAutocomplete;
