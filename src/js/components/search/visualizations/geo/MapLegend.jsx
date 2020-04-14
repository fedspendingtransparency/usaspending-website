/**
 * MapLegend.jsx
 * Created by Kevin Li 2/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as MapHelper from 'helpers/mapHelper';

import MapLegendItem from './MapLegendItem';
import { mapLegendTT } from './MapLegendTooltip';

const propTypes = {
    mapLegendToggleData: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string
    })),
    mapLegendToggle: PropTypes.string,
    updateMapLegendToggle: PropTypes.func
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
        this.prepareItems(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.prepareItems(nextProps);
    }

    prepareItems(props) {
        const items = [];

        props.segments.forEach((segment, i) => {
            let label = '';

            const color = MapHelper.visualizationColors[i];

            const currencyValue =
                MoneyFormatter.formatMoneyWithPrecision(segment / props.units.unit,
                    props.units.precision) + props.units.unitLabel;

            let previousValue = '';

            if (i > 0) {
                const previous = props.segments[i - 1];
                previousValue =
                    MoneyFormatter.formatMoneyWithPrecision(previous / props.units.unit,
                        props.units.precision) + props.units.unitLabel;
            }

            if (i === 0) {
                // first item
                label = `Less than ${currencyValue}`;
            }
            else if (i + 1 === props.segments.length) {
                // last item
                label = `More than ${previousValue}`;
            }
            else {
                // remaining items
                label = `${previousValue} to ${currencyValue}`;
            }

            const item = (<MapLegendItem
                key={`item-${i}`}
                label={label}
                color={color} />);

            items.push(item);
        });

        this.setState({
            items
        });
    }

    updateToggle = (e) => {
        this.props.updateMapLegendToggle(e.target.value);
    }

    headerToggle = () => {
        const { mapLegendToggleData, mapLegendToggle } = this.props;

        if (!mapLegendToggleData) return null;

        return (mapLegendToggleData?.map((toggleButtonData) => (
            <div
                className="map-legend-header__body-toggle-button__container"
                key={toggleButtonData.value}>
                <label
                    htmlFor={`map-legend-header__body-toggle-button__${toggleButtonData.value}`}>
                    <input
                        type="radio"
                        id={`map-legend-header__body-toggle-button__${toggleButtonData.value}`}
                        value={toggleButtonData.value}
                        checked={toggleButtonData.value === mapLegendToggle}
                        onChange={this.updateToggle} />
                    {toggleButtonData.title}
                </label>
            </div>
        )));
    }

    header = () => (
        <div className="map-legend-header">
            <div className="map-legend-header__title">
                <h6 className="map-legend-header__title-text">
                    Show on Map
                </h6>
                <TooltipWrapper
                    className="tooltip-wrapper award-section-tt"
                    icon="info"
                    right
                    tooltipComponent={mapLegendTT} />
            </div>
            <div className="map-legend-header__body">
                {this.headerToggle()}
            </div>
        </div>
    );

    render() {
        return (
            <div className="map-legend">
                {this.header()}
                <ul className="map-legend-body">
                    {this.state.items}
                </ul>
            </div>
        );
    }
}

MapLegend.propTypes = propTypes;
MapLegend.defaultProps = defaultProps;
