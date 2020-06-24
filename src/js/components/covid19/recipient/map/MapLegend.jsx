/**
 * MapLegend.jsx
 * Created by Jonathan Hill 06/24/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { visualizationColors } from 'dataMapping/covid19/recipient/map/map';
import MapLegendItem from './MapLegendItem';

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
    const [items, setItems] = useState([]);
    const prepareItems = useCallback(() => {
        const newItems = segments.map((segment, i, array) => {
            let label = '';

            const color = visualizationColors[i];

            const currencyValue =
                MoneyFormatter.formatMoneyWithPrecision(segment / units.unit,
                    units.precision) + units.unitLabel;

            let previousValue = '';

            if (i > 0) {
                const previous = array[i - 1];
                previousValue =
                    MoneyFormatter.formatMoneyWithPrecision(previous / units.unit,
                        units.precision) + units.unitLabel;
            }

            if (i === 0) {
                // first item
                label = `Less than ${currencyValue}`;
            }
            else if (i + 1 === array.length) {
                // last item
                label = `More than ${previousValue}`;
            }
            else {
                // remaining items
                label = `${previousValue} to ${currencyValue}`;
            }

            return (<MapLegendItem
                key={uniqueId()}
                label={label}
                color={color} />);
        });

        setItems(newItems);
    }, [segments, units]);
    // mount
    useEffect(() => prepareItems(), []);
    // segments updates
    useEffect(() => prepareItems(), [segments, prepareItems]);

    return (
        <div className="map-legend">
            <ul className="map-legend-body">
                {items}
            </ul>
        </div>
    );
};

MapLegend.propTypes = propTypes;
MapLegend.defaultProps = defaultProps;
export default MapLegend;
