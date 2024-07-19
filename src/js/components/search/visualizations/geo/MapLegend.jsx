/**
 * MapLegend.jsx
 * Created by Kevin Li 2/17/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as MapHelper from 'helpers/mapHelper';
import MapLegendItem from './MapLegendItem';

export default function MapLegend(props) {
    const [items, setItems] = useState([]);

    const prepareItems = () => {
        const {
            segments,
            units
        } = props;
        const itemsCopy = segments.map((segment, i, array) => {
            let label = '';

            const color = MapHelper.visualizationColors[i];

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
                key={`item-${i}`}
                label={label}
                color={color} />);
        });

        setItems(itemsCopy);
    };

    useEffect(() => {
        prepareItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        prepareItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.segments, props.mapLegendToggle]);

    return (
        <div className="map-legend">
            <ul className="map-legend-body">
                {items}
            </ul>
        </div>
    );
}

const propTypes = {
    mapLegendToggleData: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string
    })),
    mapLegendToggle: PropTypes.string,
    updateMapLegendToggle: PropTypes.func,
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

MapLegend.propTypes = propTypes;
MapLegend.defaultProps = defaultProps;
