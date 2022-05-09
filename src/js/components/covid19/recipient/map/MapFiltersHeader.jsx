import React from 'react';
import { TooltipWrapper } from 'data-transparency-ui';
import { SpendingByRecipientMapTT } from 'components/covid19/Covid19Tooltips';

const MapLegendHeader = () => (
    <div className="map__filters-header__title">
        <div className="map-filters-header__title-text">
            Show on Map
        </div>
        <TooltipWrapper
            className="spending_types-tt"
            icon="info"
            tooltipPosition="right"
            tooltipComponent={<SpendingByRecipientMapTT />} />
    </div>
);

export default MapLegendHeader;
