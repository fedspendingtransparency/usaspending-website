/**
 * MapLegend.jsx
 * Created by Jonathan Hill 06/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { formatMoneyWithPrecision, calculateUnitForSingleValue } from "helpers/moneyFormatter";

const propTypes = {
    units: PropTypes.shape({
        unit: PropTypes.number,
        precision: PropTypes.number,
        unitLabel: PropTypes.string
    }),
    min: PropTypes.number,
    max: PropTypes.number
};

const MapLegend = ({
    units = {
        unit: 1,
        precision: 0,
        unitLabel: ''
    },
    min,
    max
}) => {
    const maxCurrencyValue = formatMoneyWithPrecision(
        max / calculateUnitForSingleValue(max).unit, units.precision
    ) + calculateUnitForSingleValue(max).unitLabel;

    const minCurrencyValue = formatMoneyWithPrecision(
        min / calculateUnitForSingleValue(min).unit, units.precision
    ) + calculateUnitForSingleValue(min).unitLabel;

    return (
        <div className="map-legend">
            <div className="map-legend-body-covid19">
                <span className="legend-number">{maxCurrencyValue}</span>
                <br />
                <div className="map-legend-gradient" />
                <span className="legend-number">{minCurrencyValue}</span>
            </div>
        </div>
    );
};

MapLegend.propTypes = propTypes;
export default MapLegend;
