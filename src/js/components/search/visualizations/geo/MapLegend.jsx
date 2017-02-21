/**
 * MapLegend.jsx
 * Created by Kevin Li 2/17/17
 */

import React from 'react';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import MapLegendItem from './MapLegendItem';

export default class MapLegend extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.prepareItems(this.props.segments);
    }

    componentWillReceiveProps(nextProps) {
        this.prepareItems(nextProps.segments);
    }

    prepareItems(segments) {
        const items = [];

        segments.forEach((segment, i) => {
            let label = '';
            if (i === 0) {
                // first item
                label = `Less than ${MoneyFormatter.formatMoney(segment)}`;
            }
            else if (i + 1 === segments.length) {
                // last item
                label = `More than ${MoneyFormatter.formatMoney(segments[i-1])}`;
            }
            else {
                // remaining items
                label = `${MoneyFormatter.formatMoney(segments[i-1])} to ${MoneyFormatter.formatMoney(segment)}`;
            }

            const item = (<MapLegendItem
                key={segment}
                label={label} />);

            items.push(item);
        });

        this.setState({
            items
        });
    }

    render() {
        return (
            <div className="map-legend">
                <ul>
                    {this.state.items}
                </ul>
            </div>
        );
    }
}