/**
 * MapLegend.jsx
 * Created by Kevin Li 2/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as MapHelper from 'helpers/mapHelper';

import MapLegendItem from './MapLegendItem';

const propTypes = {
    segments: PropTypes.array,
    units: PropTypes.object,
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
        console.log(' E : ', e);
        console.log(' E Target : ', e.target);
        console.log(' E val : ', e.target.value);
        this.props.updateMapLegendToggle(e.target.value);
    }

    render() {
        return (
            <div className="map-legend">
                <div>
                    {this.props?.mapLegendToggleData?.map((data) => (
                        <div key={data.value}>
                            <input
                                type="radio"
                                value={data.value}
                                checked={data.value === this.props.mapLegendToggle}
                                onChange={this.updateToggle} />
                            {data.title}
                        </div>
                    ))}
                </div>
                <ul>
                    {this.state.items}
                </ul>
            </div>
        );
    }
}

MapLegend.propTypes = propTypes;
MapLegend.defaultProps = defaultProps;
