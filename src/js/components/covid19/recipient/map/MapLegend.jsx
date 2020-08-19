/**
 * MapLegend.jsx
 * Created by Jonathan Hill 06/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    units: PropTypes.shape({
        unit: PropTypes.number,
        precision: PropTypes.number,
        unitLabel: PropTypes.string
    }),
    segments: PropTypes.arrayOf(PropTypes.number)
};

const defaultProps = {
    units: {
        unit: 1,
        precision: 0,
        unitLabel: ''
    }
};

const MapLegend = ({ units, segments }) => {
    const maxCurrencyValue = MoneyFormatter.formatMoneyWithPrecision(segments[segments.length - 1] / units.unit, units.precision) + units.unitLabel;
    const minCurrencyValue = MoneyFormatter.formatMoneyWithPrecision(segments[0] / units.unit, units.precision) + units.unitLabel;

    return (
        <div className="map-legend">
            <ul className="map-legend-body-covid19">
                {maxCurrencyValue}
                <div className="map-legend-gradient" />
                {minCurrencyValue}
            </ul>
        </div>
    );
};

MapLegend.propTypes = propTypes;
MapLegend.defaultProps = defaultProps;
export default MapLegend;
