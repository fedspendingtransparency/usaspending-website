/**
 * MapFilters.jsx
 * Created by Jonathan Hill 06/09/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { Picker, TooltipWrapper } from 'data-transparency-ui';
import { mapFilterSortOrderByValue } from 'dataMapping/covid19/covid19';
import { handleSort } from 'helpers/covid19Helper';
import { SpendingByRecipientMapTT } from '../../../../components/covid19/Covid19Tooltips';
import MapFiltersHeader from './MapFiltersHeader';
import { CondensedCDTooltip } from '../../../../components/award/shared/InfoTooltipContent';

const propTypes = {
    filters: PropTypes.object,
    activeFilters: PropTypes.object,
    isOpen: PropTypes.bool
};

const MapFilters = ({ filters, activeFilters, isOpen }) => (
    <div className={isOpen ? 'map__filters-container open' : 'map__filters-container closed'}>
        <div className="map__filters-header">
            <MapFiltersHeader />
        </div>
        <div className="map__filters-body">
            {
                Object.keys(filters).map((filter) => (
                    <div key={uniqueId()} className="map__filters-filter__container">
                        <div className="map__filters-label">
                            {filters[filter].label}
                            {filters[filter].label === 'AREA TYPE' ?
                                <TooltipWrapper
                                    icon="info"
                                    tooltipPosition="right"
                                    tooltipComponent={<CondensedCDTooltip title="Area Type: Congressional Districts" />} />
                                :
                                null}
                            {filters[filter].label === 'AMOUNT TYPE' ?
                                <TooltipWrapper
                                    className="spending_types-tt"
                                    icon="info"
                                    tooltipPosition="right"
                                    tooltipComponent={<SpendingByRecipientMapTT />} /> :
                                null}
                        </div>
                        <Picker
                            backgroundColor="#ffffff"
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
                ))
            }
        </div>
    </div>
);

MapFilters.propTypes = propTypes;
export default MapFilters;
