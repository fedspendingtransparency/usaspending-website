/**
 * MapVisualizationWrapper.jsx
 * Created by Emily Gullo 04/05/2017
 */

import React from 'react';
import _ from 'lodash';

import MapVisualization from './MapVisualization';
import MapToggleOptions from './MapToggleOptions';

const propTypes = {
    states: React.PropTypes.object
};

export default class MapVisualizationWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                values: [],
                states: []
            },
            view: 'map',
            renderHash: `geo-${_.uniqueId()}`,
            loading: true
        };

        this.changeView = this.changeView.bind(this);
    }

    componentWillReceiveProps(prevProps) {
        if (!_.isEqual(prevProps.states, this.props.states)) {
            this.parseData(prevProps.states);
        }
    }

    parseData(data) {
        let totalAmount = 0;
        const spendingValues = [];
        const spendingStates = [];

        data.children.forEach((item) => {
            // state must not be null or empty string
            if (item.item && item.item !== '') {
                spendingStates.push(item.item);
                spendingValues.push(parseFloat(item.aggregate));
            }

            totalAmount += parseFloat(item.aggregate);
        });

        this.setState({
            data: {
                values: spendingValues,
                states: spendingStates,
                total: totalAmount
            },
            renderHash: `geo-${_.uniqueId()}`,
            loading: false
        });
    }

    changeView(view) {
        this.setState({
            view
        });
    }

    render() {
        return (
            <div className="homepage-map-section">
                <MapToggleOptions
                    view={this.state.view}
                    changeView={this.changeView} />
                <MapVisualization
                    {...this.state} />
            </div>
        );
    }
}

MapVisualizationWrapper.propTypes = propTypes;
