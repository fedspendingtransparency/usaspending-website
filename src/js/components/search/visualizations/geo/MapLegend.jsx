/**
 * MapLegend.jsx
 * Created by Kevin Li 2/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as MapHelper from 'helpers/mapHelper';
import MapLegendItem from './MapLegendItem';

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

export default class MapLegend extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.prepareItems();
    }

    componentDidUpdate(prevProps) {
        const { segments, mapLegendToggle } = this.props;
        const areSegmentsDifferent = !isEqual(prevProps.segments, segments);
        const isMapLegendToggleDifferent = prevProps.mapLegendToggle !== mapLegendToggle;
        if (areSegmentsDifferent || isMapLegendToggleDifferent) this.prepareItems();
    }

    prepareItems() {
        const {
            segments,
            units
        } = this.props;
        const items = segments.map((segment, i, array) => {
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

        this.setState({
            items
        });
    }

    updateToggle = (e) => {
        this.props.updateMapLegendToggle(e.target.value);
    };

    resetToggle = () => {
        this.props.updateMapLegendToggle('totalSpending');
    };

    render() {
        return (
            <div className="map-legend">
                <ul className="map-legend-body">
                    {this.state.items}
                </ul>
            </div>
        );
    }
}

MapLegend.propTypes = propTypes;
MapLegend.defaultProps = defaultProps;
