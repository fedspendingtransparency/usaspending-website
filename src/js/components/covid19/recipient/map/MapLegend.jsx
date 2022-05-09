/**
 * MapLegend.jsx
 * Created by Jonathan Hill 06/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { calculateUnitForSingleValue } from '../../../../helpers/moneyFormatter';

const propTypes = {
    units: PropTypes.shape({
        unit: PropTypes.number,
        precision: PropTypes.number,
        unitLabel: PropTypes.string
    }),
    min: PropTypes.number,
    max: PropTypes.number
};

const defaultProps = {
    units: {
        unit: 1,
        precision: 0,
        unitLabel: ''
    }
};

const MapLegend = ({ units, min, max }) => {
    const maxCurrencyValue = MoneyFormatter.formatMoneyWithPrecision(max / calculateUnitForSingleValue(max).unit, units.precision) + calculateUnitForSingleValue(max).unitLabel;
    const minCurrencyValue = MoneyFormatter.formatMoneyWithPrecision(min / calculateUnitForSingleValue(min).unit, units.precision) + calculateUnitForSingleValue(min).unitLabel;
    return (
        <div className="map-legend">
            <ul className="map-legend-body-covid19">
                <span className="legend-number">{maxCurrencyValue}</span>
                <br />
                <div className="map-legend-gradient" />
                <span className="legend-number">{minCurrencyValue}</span>
            </ul>
        </div>
    );
};

MapLegend.propTypes = propTypes;
MapLegend.defaultProps = defaultProps;
export default MapLegend;
