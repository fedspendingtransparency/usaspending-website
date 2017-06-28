/**
 * MapVisualizationWrapper.jsx
 * Created by Emily Gullo 04/05/2017
 */

import React from 'react';
import _ from 'lodash';

import MapVisualization from './MapVisualization';
import MapList from './MapList';
import MapToggleList from './MapToggleList';
import HomepageMapCitation from './HomepageMapCitation';

const propTypes = {
    data: React.PropTypes.object
};

export default class MapVisualizationWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 'map',
            renderHash: `geo-${_.uniqueId()}`,
            loading: true,
            showPerCapita: false,
            dataKey: 'total'
        };

        this.changeView = this.changeView.bind(this);
        this.togglePerCapita = this.togglePerCapita.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.data, this.props.data)) {
            this.parseData();
        }
    }

    parseData() {
        this.setState({
            renderHash: `geo-${_.uniqueId()}`,
            loading: false
        });
    }

    changeView(view) {
        this.setState({
            view
        });
    }

    togglePerCapita() {
        let dataKey = 'total';
        let showPerCapita = false;
        if (!this.state.showPerCapita) {
            dataKey = 'capita';
            showPerCapita = true;
        }

        this.setState({
            showPerCapita,
            dataKey,
            renderHash: `geo-${_.uniqueId()}`
        });
    }

    render() {
        let content = (<MapVisualization
            {...this.state}
            data={this.props.data[this.state.dataKey]}
            togglePerCapita={this.togglePerCapita} />);

        if (this.state.view === 'list') {
            content = (<MapList
                data={this.props.data.table} />);
        }

        return (
            <div className="homepage-map-section">
                <MapToggleList
                    view={this.state.view}
                    changeView={this.changeView} />
                {content}
                <HomepageMapCitation />
            </div>
        );
    }
}

MapVisualizationWrapper.propTypes = propTypes;
