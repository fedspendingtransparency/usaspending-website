/**
 * MapLegend.jsx
 * Created by Kevin Li 2/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from "lodash-es";

import { formatMoneyWithPrecision } from "helpers/moneyFormatter";
import { visualizationColors } from "helpers/mapHelper";
import MapLegendItem from './MapLegendItem';

const propTypes = {
    units: PropTypes.shape({
        unit: PropTypes.number,
        precision: PropTypes.number,
        unitLabel: PropTypes.string
    }),
    segments: PropTypes.arrayOf(PropTypes.number)
};

const MapLegend = ({
    units = {
        unit: 1,
        precision: 0,
        unitLabel: ''
    },
    segments
}) => {
    const prepareItems = (s, { unit, precision, unitLabel }) => s.map((segment, i, array) => {
        let label;

        const color = visualizationColors[i];

        const currencyValue =
                formatMoneyWithPrecision(segment / unit,
                    precision) + unitLabel;

        let previousValue = '';

        if (i > 0) {
            const previous = array[i - 1];
            previousValue =
                    formatMoneyWithPrecision(previous / unit,
                        precision) + unitLabel;
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
            key={`item-${uniqueId()}`}
            label={label}
            color={color} />);
    });


    return (
        <div className="map-legend">
            <ul className="map-legend-body">
                {prepareItems(segments, units)}
            </ul>
        </div>
    );
};

MapLegend.propTypes = propTypes;
export default MapLegend;
